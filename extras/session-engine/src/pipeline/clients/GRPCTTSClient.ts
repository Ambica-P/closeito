import * as grpc from "@grpc/grpc-js";
import { AudioChunk } from "@repo/media-types/audio";
import { loadProto } from "../../grpc/loadProto";
import { TTSClient } from "../TTSClient";
import { LLMToken } from "../types";

const ttsProto = loadProto("tts.proto").tts;

export class GRPCTTSClient implements TTSClient {
    private client: any;
    private stream: any;
    private audioCallback?: (chunk: AudioChunk) => void;

    constructor(ttsServiceUrl: string) {
        this.client = new ttsProto.TTSService(
            ttsServiceUrl,
            grpc.credentials.createInsecure()
        );
    }

    async start(): Promise<void> {
        console.log("[TTS Client] Opening stream");
        this.stream = this.client.StreamTTS();
        // apps/session-engine/src/pipeline/clients/GRPCTTSClient.ts

        this.stream.on("data", (chunk: any) => {
            console.log("[TTS] Received audio chunk:", chunk.pcm?.length);
            if (!this.audioCallback) return;

            // 🔴 CORRECT FLOAT32 DECODE
            const pcm = new Float32Array(
                chunk.pcm.buffer,
                chunk.pcm.byteOffset,
                chunk.pcm.length / 4
            );

            this.audioCallback({
                pcm,
                timestamp: Number(chunk.timestamp),
            });
        });


        this.stream.on("end", () => {
            console.log("[TTS Client] Stream ended");
        });

        this.stream.on("error", (err: any) => {
            console.error("[TTS Client] Error", err);
        });
    }

    async sendToken(token: LLMToken): Promise<void> {
        if (!this.stream) return;

        console.log("[Node → TTS] Sending token:", token.text);
        this.stream.write({ text: token.text });
    }

    async flush(): Promise<void> { }

    interrupt(): void {
        if (this.stream) {
            console.log("[TTS Client] Interrupt");
            this.stream.end();
            this.stream = null;
        }
    }

    async stop(): Promise<void> {
        this.interrupt();
    }

    onAudio(cb: (chunk: AudioChunk) => void): void {
        this.audioCallback = cb;
    }
}
