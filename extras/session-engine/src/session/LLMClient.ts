import { LLMProvider } from "../pipeline/LLMProvider";
import { buildPrompt } from "../pipeline/PromptBuilder";
import { RAGClient } from "../pipeline/RAGClient";
import { LLMToken } from "../pipeline/types";
import { SessionContext } from "../session/SessionContext";

export class LLMClient {
    private readonly rag: RAGClient;
    private readonly provider: LLMProvider;
    private readonly ctx: SessionContext;

    private interrupted = false;

    constructor(params: {
        ctx: SessionContext;
        rag: RAGClient;
        provider: LLMProvider;
    }) {
        this.ctx = params.ctx;
        this.rag = params.rag;
        this.provider = params.provider;
    }

    interrupt() {
        this.interrupted = true;
    }

    stop() {
        this.interrupted = true;
    }
    async *streamResponse(
        userText: string,
        signal: AbortSignal
    ): AsyncGenerator<LLMToken> {
        console.log("[LLM] streamResponse called:", userText);
        this.interrupted = false;

        // 1️⃣ Query RAG (isolated per session)
        const ragContext = await this.rag.query({
            workspaceId: this.ctx.workspaceId,
            agentId: this.ctx.agentId,
            query: userText,
            topK: 5,
        });

        // 2️⃣ Build prompt
        const prompt = buildPrompt(ragContext, userText);

        // 3️⃣ Stream from provider
        for await (const token of this.provider.streamChat(prompt, signal)) {
            if (signal.aborted || this.interrupted) {
                return;
            }
            console.log("[LLM] yielding token:", token.text);
            yield token;
        }
    }
}
