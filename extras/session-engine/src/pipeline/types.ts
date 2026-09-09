export interface LLMToken {
    text: string;
}

export interface LLMMessage {
    role: "system" | "user" | "assistant";
    content: string;
}
