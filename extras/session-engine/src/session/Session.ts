// apps/session-engine/src/session/Session.ts

import { SessionStatus, SessionEvent } from "./SessionState";
import { SessionContext } from "./SessionContext";
import { EventEmitter } from "events";

import { LLMClient } from "./LLMClient";
import { TTSClient } from "../pipeline/TTSClient";
import { AvatarClient } from "../pipeline/AvatarClient";

export class Session extends EventEmitter {
    public readonly context: SessionContext;
    public status: SessionStatus = SessionStatus.IDLE;

    private llm: LLMClient;
    private tts: TTSClient;
    private avatar: AvatarClient;

    private abortController: AbortController | null = null;

    constructor(
        context: SessionContext,
        deps: {
            llm: LLMClient;
            tts: TTSClient;
            avatar: AvatarClient;
        }
    ) {
        super();
        this.context = context;
        this.llm = deps.llm;
        this.tts = deps.tts;
        this.avatar = deps.avatar;
    }

    // -------------------------
    // Lifecycle
    // -------------------------

    async start(): Promise<void> {
        if (this.status !== SessionStatus.IDLE) {
            throw new Error(`Session ${this.context.sessionId} already started`);
        }

        this.status = SessionStatus.STARTING;
        this.abortController = new AbortController();

        try {
            await this.avatar.start();
            await this.tts.start();

            // Pipe TTS audio → Avatar
            this.tts.onAudio(chunk => {
                this.avatar.sendAudio(chunk);
            });

            this.status = SessionStatus.RUNNING;
        } catch (err) {
            this.status = SessionStatus.ERROR;
            this.emit(SessionEvent.ERROR, err);
            throw err;
        }
    }

    async stop(): Promise<void> {
        if (
            this.status === SessionStatus.STOPPING ||
            this.status === SessionStatus.STOPPED
        ) {
            return;
        }

        this.status = SessionStatus.STOPPING;
        this.abortController?.abort();

        await Promise.allSettled([
            this.llm.stop(),
            this.tts.stop(),
            this.avatar.stop(),
        ]);

        this.status = SessionStatus.STOPPED;
    }

    // -------------------------
    // User Speech Handling (STREAMING PHRASES)
    // -------------------------

    async handleUserText(text: string): Promise<void> {
        console.log("[Session] handleUserText:", text);

        if (this.status !== SessionStatus.RUNNING) {
            console.log("[Session] Not running, status:", this.status);
            return;
        }

        this.emit(SessionEvent.USER_SPEECH_START);

        const signal = this.abortController?.signal;
        if (!signal) return;

        let buffer = "";

        try {
            // 🔴 STREAM TOKENS FROM LLM
            for await (const token of this.llm.streamResponse(text, signal)) {
                if (signal.aborted) break;

                buffer += token.text;

                // 🔴 FLUSH WHEN PHRASE IS READY
                if (this.shouldFlush(buffer)) {
                    const phrase = buffer.trim();
                    buffer = "";

                    console.log("[Session → TTS] Phrase:", phrase);
                    await this.tts.sendToken({ text: phrase });
                }
            }

            // 🔴 FLUSH REMAINDER
            if (buffer.trim().length > 0) {
                console.log("[Session → TTS] Final phrase:", buffer.trim());
                await this.tts.sendToken({ text: buffer.trim() });
            }

            await this.tts.flush();
        } catch (err) {
            this.emit(SessionEvent.ERROR, err);
        } finally {
            this.emit(SessionEvent.USER_SPEECH_END);
        }
    }

    // -------------------------
    // Phrase Chunking Logic (CRITICAL)
    // -------------------------

    private shouldFlush(text: string): boolean {
        // Sentence boundary
        if (text.endsWith(".") || text.endsWith("?") || text.endsWith("!")) {
            return true;
        }

        // Long enough phrase
        if (text.length >= 60) {
            return true;
        }

        // Comma pause
        if (text.endsWith(",") && text.length >= 30) {
            return true;
        }

        return false;
    }

    // -------------------------
    // Agent Control
    // -------------------------

    interruptAgent(): void {
        this.emit(SessionEvent.INTERRUPT);

        this.llm.interrupt();
        this.tts.interrupt();
        this.avatar.interrupt();
    }
}
