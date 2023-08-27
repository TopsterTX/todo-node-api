import { config } from "dotenv";

export const connectEnv = () => {
  config();
  config({ path: ".env.local", override: true });
  config({ path: `.env.${process.env.NODE_ENV}`, override: true });
};
