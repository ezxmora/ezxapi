import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "QuoteAuthor",
  tableName: "quote_authors",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
      unique: true,
    },
  },
  relations: {
    quotes: {
      type: "one-to-many",
      target: "Quote",
      cascade: true,
      inverseSide: "author",
    },
  },
});
