import typeorm from "typeorm";
import Key from "../entities/Key.js";
import Quote from "../entities/Quote.js";
import QuoteAuthor from "../entities/QuoteAuthor.js";
import { dbHost, dbPass, dbPort, dbUser } from "./env.js";

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: "ezxapi",
  synchronize: "true",
  entities: [Key, Quote, QuoteAuthor],
});

export default dataSource;
