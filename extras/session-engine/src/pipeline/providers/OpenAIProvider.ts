import OpenAI from "openai";
import { LLMProvider } from "../LLMProvider";
import { LLMMessage, LLMToken } from "../types";

export class OpenAIProvider implements LLMProvider {
    private client: OpenAI;

    constructor(apiKey: string) {
        this.client = new OpenAI({ apiKey });
    }

    async *streamChat(
        messages: LLMMessage[],
        signal: AbortSignal
    ): AsyncGenerator<LLMToken> {
        const stream = await this.client.chat.completions.create({
            model: "gpt-4.1",
            messages,
            stream: true,
        });

        for await (const chunk of stream) {
            if (signal.aborted) return;

            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
                yield { text: delta };
            }
        }
    }
}
