import { createUserMessage, systemMessage } from "../chat-messages";
import { Col, Row, parseRecipeDataset } from "../parse-recipe-dataset";

const prepareExampleConversation = (row: Row) => [
  systemMessage,
  createUserMessage(row[Col.TITLE], row[Col.INGREDIENTS]),
];

const main = async () => {
  const data = await parseRecipeDataset(1, 100);
  console.log(JSON.stringify(data, null, 2));

  console.log(JSON.stringify(prepareExampleConversation(data[0]), null, 2));

  // const rsp = await openai.client.chat.completions.create({
  //   model: "ft:gpt-3.5-turbo-0613:personal:recipe-ner:8xk7A8ig",
  //   messages: prepareExampleConversation(data[0]),
  //   temperature: 0,
  //   max_tokens: 500,
  // });

  // console.log(JSON.stringify(rsp, null, 2))
};

main();
