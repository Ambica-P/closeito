import { LLMMessage } from "./types";

export function buildPrompt(
    ragContext: string[],
    userText: string
): LLMMessage[] {
    const system: LLMMessage = {
        role: "system",
        content: `
You are a professional AI sales agent.
You must answer using only verified product information.
Be concise, helpful, and persuasive.
`,
    };

    const context: LLMMessage = {
        role: "system",
        content: `Relevant product context:\n${ragContext.join("\n---\n")}`,
    };

    const user: LLMMessage = {
        role: "user",
        content: userText,
    };

    return [system, context, user];
}
