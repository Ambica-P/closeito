import { Session } from "./Session";
import { SessionContext } from "./SessionContext";
import { LLMClient } from "./LLMClient";
import { TTSClient } from "../pipeline/TTSClient";
import { AvatarClient } from "../pipeline/AvatarClient";

type SessionDepsFactory = {
    createLLM: (ctx: SessionContext) => LLMClient;
    createTTS: (ctx: SessionContext) => TTSClient;
    createAvatar: (ctx: SessionContext) => AvatarClient;
};

export class SessionManager {
    private sessions: Map<string, Session> = new Map();
    private readonly maxSessions: number;
    private readonly depsFactory: SessionDepsFactory;

    constructor(depsFactory: SessionDepsFactory, maxSessions = 1000) {
        this.depsFactory = depsFactory;
        this.maxSessions = maxSessions;
    }

    async createSession(ctx: SessionContext): Promise<Session> {
        if (this.sessions.size >= this.maxSessions) {
            throw new Error("Max sessions limit reached");
        }

        if (this.sessions.has(ctx.sessionId)) {
            throw new Error(`Session ${ctx.sessionId} already exists`);
        }

        const session = new Session(ctx, {
            llm: this.depsFactory.createLLM(ctx),
            tts: this.depsFactory.createTTS(ctx),
            avatar: this.depsFactory.createAvatar(ctx),
        });

        this.attachLifecycleHooks(session);
        this.sessions.set(ctx.sessionId, session);

        await session.start();

        return session;
    }

    getSession(sessionId: string): Session | undefined {
        return this.sessions.get(sessionId);
    }

    async destroySession(sessionId: string): Promise<void> {
        const session = this.sessions.get(sessionId);
        if (!session) return;

        await session.stop();
        this.sessions.delete(sessionId);
    }

    async shutdownAll(): Promise<void> {
        const stops = Array.from(this.sessions.values()).map((s) => s.stop());
        await Promise.allSettled(stops);
        this.sessions.clear();
    }

    listActiveSessions(): SessionContext[] {
        return Array.from(this.sessions.values()).map((s) => s.context);
    }

    count(): number {
        return this.sessions.size;
    }

    private attachLifecycleHooks(session: Session) {
        session.on("error", async (err) => {
            console.error(
                `[SessionManager] Session ${session.context.sessionId} crashed:`,
                err
            );
            await this.destroySession(session.context.sessionId);
        });

        session.on("stopped", () => {
            this.sessions.delete(session.context.sessionId);
        });
    }
}
