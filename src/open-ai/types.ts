import type { OpenAI } from "openai";

export type ChatCompletionMsgs = {
  messages: OpenAI.ChatCompletionMessageParam[];
};
