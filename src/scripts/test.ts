import path from "path";
import { DATASETS_PATH } from "../constants";
import { streamParseCsv } from "../utils/csv/parse-csv";

enum Col {
  IDX,
  TITLE,
  INGREDIENTS,
  DIRECTIONS,
  URL,
  SOURCE,
  NER,
}

type Row = [number, string, string[], string[], string, string, string[]];

const main = async () => {
  const data = await streamParseCsv<Row>(
    path.join(DATASETS_PATH, "recipe-nlg--full_dataset.csv"),
    { includeLine: (line) => line.includes("www.cookbooks.com"), limit: 30 },
  );
  console.info(`:: data`, data.length);
  console.info(`::`, data[0][Col.INGREDIENTS]);
};

main();
