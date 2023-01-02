import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: 'Quote',
  tableName: 'quotes',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    quote: {
      type: "varchar"
    }
  },
  relations: {
    author: {
      type: 'many-to-one',
      target: 'QuoteAuthor',
      joinColumn: {
        name: 'author_id',
      },
      iverseSide: 'quote'
    }
  }
});
