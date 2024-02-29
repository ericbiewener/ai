import fs from "fs";
import readline from "readline";

export const readLines = (
  file: string,
  onLine: (line: string) => void,
  shouldContinue?: (line: string) => boolean,
) =>
  new Promise<void>((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    });

    rl.on(
      "line",
      shouldContinue
        ? (line) => {
            if (shouldContinue(line)) {
              onLine(line);
            } else {
              rl.close();
            }
          }
        : onLine,
    );
    rl.on("close", resolve);
    rl.on("error", reject);
  });
