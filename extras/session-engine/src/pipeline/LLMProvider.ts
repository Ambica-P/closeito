import { LLMMessage, LLMToken } from "./types";

export interface LLMProvider {
  streamChat(
    messages: LLMMessage[],
    signal: AbortSignal
  ): AsyncGenerator<LLMToken>;
}
