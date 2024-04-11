import { OpenAI } from "openai";

export const createUserMessage = (
  title: string,
  ingredients: string,
): OpenAI.ChatCompletionUserMessageParam => ({
  role: "user",
  content: [
    `Title: ${title}`,
    `Ingredients: ${ingredients}`,
    `Generic ingredients: `,
  ].join("\n\n"),
});

export const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
  role: "system",
  content:
    "You are a helpful recipe assistant. You are to extract the generic ingredients from each of the recipes provided.",
};
