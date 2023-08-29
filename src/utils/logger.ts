import Winston from "winston";
import { ALL_LVL_FILE_NAME, ERROR_FILE_NAME } from "constants/index";
import { connectEnv } from "./connectEnv";

connectEnv();

const LOG_DIR = "logs/";

const { combine, timestamp, prettyPrint, json } = Winston.format;

const now = new Date().toLocaleDateString("ru");

export const logger = Winston.createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new Winston.transports.File({
      filename: `${LOG_DIR}${ERROR_FILE_NAME}-${now}.json`,
      level: "error",
    }),
    new Winston.transports.File({
      filename: `${LOG_DIR}${ALL_LVL_FILE_NAME}-${now}.json`,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  );
}
