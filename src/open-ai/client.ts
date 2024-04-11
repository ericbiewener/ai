import chalk from "chalk";
import fs from "fs";
import OpenAI from "openai";
import os from "os";
import path from "path";
import { ChatCompletionMsgs } from "./types";

const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const uploadFineTuneData = async (
  basename: string,
  data: ChatCompletionMsgs[],
) => {
  const file = path.join(os.tmpdir(), basename);

  fs.writeFileSync(file, data.map((r) => JSON.stringify(r)).join("\n"));

  console.info(`${chalk.cyan("Fine tune data written:")} ${file}`);

  const rsp = await client.files.create({
    file: fs.createReadStream(file),
    purpose: "fine-tune",
  });

  console.info(
    `${chalk.cyan("files.create response:")}\n${JSON.stringify(rsp, null, 2)}`,
  );

  return rsp;
};

export const openai = {
  client,
  uploadFineTuneData,
};
