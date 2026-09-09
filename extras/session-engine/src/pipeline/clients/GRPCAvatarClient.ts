import * as grpc from "@grpc/grpc-js";
import { AudioChunk } from "@repo/media-types/audio";
import { VideoFrame } from "@repo/media-types/video";
import { loadProto } from "../../grpc/loadProto";
import { AvatarClient } from "../AvatarClient";

const avatarProto = loadProto("avatar.proto").avatar;

export class GRPCAvatarClient implements AvatarClient {
    private client: any;
    private stream: any;
    private frameCallback?: (frame: VideoFrame) => void;

    constructor(avatarServiceUrl: string) {
        this.client = new avatarProto.AvatarService(
            avatarServiceUrl,
            grpc.credentials.createInsecure()
        );
    }

    async start(): Promise<void> {
        console.log("[Avatar Client] Opening stream");
        this.stream = this.client.StreamAvatar();

        this.stream.on("data", (frame: any) => {
            console.log("[Avatar Client] Frame received");

            if (!this.frameCallback) return;

            this.frameCallback({
                width: frame.width,
                height: frame.height,
                data: frame.data,
                timestamp: Number(frame.timestamp),
                format: "RGB",
            });
        });

        this.stream.on("end", () => {
            console.log("[Avatar Client] Stream ended");
        });

        this.stream.on("error", (err: any) => {
            console.error("[Avatar Client] Error", err);
        });
    }

    sendAudio(chunk: AudioChunk): void {
        if (!this.stream) {
            console.warn("[Avatar Client] Stream not open");
            return;
        }

        console.log("[Node → Avatar] Sending audio:", chunk.pcm.length);

        this.stream.write({
            pcm: Buffer.from(chunk.pcm.buffer),
            timestamp: chunk.timestamp,
        });
    }

    interrupt(): void {
        if (this.stream) {
            console.log("[Avatar Client] Interrupt");
            this.stream.end();
            this.stream = null;
        }
    }

    async stop(): Promise<void> {
        this.interrupt();
    }

    onFrame(cb: (frame: VideoFrame) => void): void {
        this.frameCallback = cb;
    }
}
