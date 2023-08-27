import { connectEnv } from "utils/index";

connectEnv();

const DEFAULT_PORT = 80;
export const PORT = process.env.PORT || DEFAULT_PORT;
export const TODOS_PATH = "data/todos.json";
