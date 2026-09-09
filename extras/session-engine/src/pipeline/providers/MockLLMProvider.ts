import { LLMProvider } from "../LLMProvider";
import { LLMMessage, LLMToken } from "../types";

export class MockLLMProvider implements LLMProvider {
    async *streamChat(
        messages: LLMMessage[],
        signal: AbortSignal
    ): AsyncGenerator<LLMToken> {
        console.log("[MockLLM] streamChat called", messages);
        const reply =
            "Hello! Welcome to our AI sales demo. Let me show you how our product works.";

        for (const word of reply.split(" ")) {
            if (signal.aborted) break;
            console.log("[MockLLM] yield:", word);

            yield { text: word + " " };
            await new Promise((r) => setTimeout(r, 100));
        }
    }
}
