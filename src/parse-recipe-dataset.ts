import path from "path";
import { DATASETS_PATH } from "./constants";
import { streamParseCsv } from "./utils/csv/parse-csv";

export enum Col {
  IDX,
  TITLE,
  INGREDIENTS,
  DIRECTIONS,
  URL,
  SOURCE,
  NER,
}

export type Row = [number, string, string, string, string, string, string];

export const parseRecipeDataset = async (limit = 30, startIdx = 0) => {
  const rows = await streamParseCsv<Row>(
    path.join(DATASETS_PATH, "recipe-nlg--full_dataset.csv"),
    {
      includeLine: (line) => line.includes("www.cookbooks.com"),
      limit: limit + startIdx,
    },
  );

  return rows.slice(startIdx);
};
