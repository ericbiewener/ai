import path from "path";
import { DATASETS_PATH } from "../constants";
import { streamParseCsv } from "../utils/csv/parse-csv";

const main = async () => {
  const data = await streamParseCsv(
    path.join(DATASETS_PATH, "recipe-nlg--full_dataset.csv"),
    { includeLine: (line) => line.includes("www.cookbooks.com"), limit: 50 },
  );
  console.info(`:: data`, data.length);
};

main();
