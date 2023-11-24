import fs from "fs";
import { basename, dirname, join } from "path";
import { DataTypes, Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import { dbHost, dbPass, dbPort, dbUser, env } from "./env.js";

const __filaname = fileURLToPath(import.meta.url);
const entitiesFolder = join(
  __filaname.split(basename(dirname(__filaname)))[0],
  "entities"
);
const files = fs
  .readdirSync(entitiesFolder)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== "entities" && file.slice(-3) === ".js"
  );

const database = {};

const sequelize = new Sequelize("ezxapi", dbUser, dbPass, {
  dialect: "postgres",
  host: dbHost,
  port: dbPort,
  logging: (msg) => process.stdout.write(`📦 [DATABASE] ${msg}\n`),
});

// Importing all the entities
await Promise.all(
  files.map(async (file) => {
    const model = (
      await import(join("file:///", entitiesFolder, file))
    ).default(sequelize, DataTypes);
    database[model.name] = model;
  })
);

// Relations
Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

if (env !== "production") {
  await sequelize.sync({ force: true });
  const { key, author, quote } = database;
  // Dummy data for testing purposes
  await key.create({
    key: "79cf940f1c6f9876db59571015fc1e28ad85c20c81f1cdeef4bdae28b1dd811b",
    email: "fake@mail.com",
  });

  await author.create({
    id: "00000000-0000-0000-0000-000000000000",
    name: "Author",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000001",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000002",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000003",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000004",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000005",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000006",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000007",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000008",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000009",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000010",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000011",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000012",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });

  await quote.create({
    id: "00000000-0000-0000-0000-000000000013",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac.",
    authorId: "00000000-0000-0000-0000-000000000000",
  });
} else {
  await sequelize.sync();
}

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
