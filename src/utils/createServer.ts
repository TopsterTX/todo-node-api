import express, { json } from "express";
import { connectEnv } from "utils/index";
import { PORT } from "constants/index";
import { todoRouter } from "routes/index";
import { loggerMiddleware } from "middlewares/index";

connectEnv();

export const createServer = () => {
  const app = express();

  // middlewares
  app.use(json());
  app.use(loggerMiddleware);

  app.use(todoRouter);

  app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
};
