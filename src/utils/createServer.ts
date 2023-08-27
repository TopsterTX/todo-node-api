import express, { json, Router } from "express";
import { connectEnv, getTodos } from "utils/index";
import { PORT, TODOS_PATH } from "constants/index";

connectEnv();

export const createServer = () => {
  const app = express();

  app.use(json());

  app.get("/", async (req, res) => {
    const todos = await getTodos(TODOS_PATH);
    return res.json(todos);
  });

  app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
};
