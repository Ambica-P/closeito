import { AudioChunk } from "@repo/media-types/audio";
import { VideoFrame } from "@repo/media-types/video";

export interface AvatarClient {
    start(): Promise<void>;
    stop(): Promise<void>;

    sendAudio(chunk: AudioChunk): void;

    interrupt(): void;

    onFrame(cb: (frame: VideoFrame) => void): void;
}
