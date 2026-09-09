import { SessionManager } from "../session/SessionManager";
import { MockLLMProvider } from "../pipeline/providers/MockLLMProvider";
import { MockRAGClient } from "../pipeline/MockRAGClient";
import { LLMClient } from "../session/LLMClient";

import fs from "fs";
import path from "path";
import { GRPCTTSClient } from "../pipeline/clients/GRPCTTSClient";
import { GRPCAvatarClient } from "../pipeline/clients/GRPCAvatarClient";

async function main() {
    const sessionManager = new SessionManager({
        createLLM: (ctx) =>
            new LLMClient({
                ctx,
                rag: new MockRAGClient(),
                provider: new MockLLMProvider(),
            }),
        createTTS: () => new GRPCTTSClient("localhost:50051"),
        createAvatar: () => new GRPCAvatarClient("localhost:50052"),
    });

    const session = await sessionManager.createSession({
        sessionId: "test-session",
        workspaceId: "test-ws",
        agentId: "test-agent",
        userId: "test-user",
        roomId: "test-room",
        language: "en",
        timezone: "UTC",
        createdAt: Date.now(),
    });

    let frameCount = 0;
    session["avatar"].onFrame((frame) => {
        const outDir = path.join(__dirname, "../../../tmp_frames");
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

        const file = path.join(outDir, `frame_${frameCount++}.rgb`);
        fs.writeFileSync(file, frame.data);

        console.log("Saved frame:", file);
    });

    console.log("Sending user text...");
    await session.handleUserText("Tell me about your product");

    setTimeout(async () => {
        console.log("Stopping session...");
        await sessionManager.destroySession("test-session");
        console.log("Session ended.");
    }, 20000); // give audio/video time

}

main();
