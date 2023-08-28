import { writeFile as fsWritefile } from "fs/promises";

export const writeFile = async (path: string, data: string) => {
  try {
    return await fsWritefile(path, data);
  } catch (error) {}
};
