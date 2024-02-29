import fs from "fs";
import readline from "readline";

export const readLines = (
  file: string,
  onLine: (line: string) => void,
  limit?: number,
) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
  });

  const work = new Promise<void>((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    });

    rl.on("line", onLine);
    rl.on("close", resolve);
    rl.on("error", reject);
  });

  return { rl, work };
};
