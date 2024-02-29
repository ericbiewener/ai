import { parse } from "csv-parse/sync";
import fs from "fs";
import { readLines } from "../fs/read-lines";

export const parseCsv = <D>(file: string, preserveHeaders = false) => {
  const rows: D[] = parse(fs.readFileSync(file, "utf-8"));
  if (preserveHeaders) return rows;
  rows.shift();
  return rows;
};

type StreamParseOptions = {
  includeLine?: (line: string) => boolean;
  limit?: number;
};

export const streamParseCsv = async <V extends unknown[]>(
  file: string,
  { includeLine, limit }: StreamParseOptions = {},
) => {
  const records: V[] = [];

  await readLines(
    file,
    (line) => {
      if (!includeLine || includeLine(line)) {
        records.push(...parse(line));
      }
    },
    () => !limit || records.length < limit,
  );

  return records;
};
