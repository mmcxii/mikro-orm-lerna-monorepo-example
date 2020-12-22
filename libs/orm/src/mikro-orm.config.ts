import "dotenv/config";
import { Options } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";
import { Author, Book, BookTag, Publisher } from "./lib";

const logger = new Logger("MikroORM");
export const mikroOrmConfig = {
  entities: [Author, Book, BookTag, Publisher],
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  type: "postgresql",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT, 10),
  debug: process.env.NODE_ENV === "development",
  logger: logger.log.bind(logger),
} as Options;

export default mikroOrmConfig;
