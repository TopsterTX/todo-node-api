import { v4 as uuidv4 } from "uuid";
import Winston from "winston";
import { logger } from "utils/index";
import { Middleware, Log } from "types/index";

export const loggerMiddleware: Middleware = (req, res, next) => {
  const log: Log<typeof req.body> = {
    url: req.originalUrl,
    rid: uuidv4(),
    body: req.body,
    code: res.statusCode,
    method: req.method,
  };
  logger.log("info", JSON.stringify(log));
  next();
};
