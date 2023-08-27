import { readFile } from "fs/promises";

export const getTodos = async (path: string) => {
  const buffer = await readFile(path);
  return JSON.parse(buffer.toString());
};
