import { LLMToken } from "./types";
import { AudioChunk } from "@repo/media-types/audio";

export interface TTSClient {
    start(): Promise<void>;
    stop(): Promise<void>;

    sendToken(token: LLMToken): Promise<void>;
    flush(): Promise<void>;

    interrupt(): void;

    onAudio(cb: (chunk: AudioChunk) => void): void;
}
