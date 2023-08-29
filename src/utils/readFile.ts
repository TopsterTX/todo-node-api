import { readFile as fsReadFile } from "fs/promises";

export const readFile = async (path: string) => {
  try {
    const buffer = await fsReadFile(path);
    return JSON.parse(buffer.toString());
  } catch (error) {}
};
