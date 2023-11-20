import dotenv from "dotenv-safe";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({
  path: path.join(__dirname, "../../.env"),
  example: path.join(__dirname, "../../.env.example"),
});

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logs =
  "📄 [LOG] [:date[clf]] :method :status -- :url - :response-time ms";
export const host =
  process.env.NODE_ENV === "production" ? process.env.APP_HOST : "localhost";
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
