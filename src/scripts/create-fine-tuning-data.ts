import type { OpenAI } from "openai";
import { createUserMessage, systemMessage } from "../chat-messages";
import { openai } from "../open-ai/client";
import { Col, Row, parseRecipeDataset } from "../parse-recipe-dataset";

const RECIPE_LIMIT = 30;

const prepareExampleConversation = (row: Row) => {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    systemMessage,
    createUserMessage(row[Col.TITLE], row[Col.INGREDIENTS]),
    { role: "assistant", content: row[Col.NER] },
  ];

  return { messages };
};

const main = async () => {
  const data = await parseRecipeDataset(RECIPE_LIMIT * 2);

  // Training data
  await openai.uploadFineTuneData(
    "recipe-training-data.jsonl",
    data.slice(0, RECIPE_LIMIT).map(prepareExampleConversation),
  );

  // Validation data
  await openai.uploadFineTuneData(
    "recipe-validation-data.jsonl",
    data.slice(RECIPE_LIMIT).map(prepareExampleConversation),
  );
};

main();
