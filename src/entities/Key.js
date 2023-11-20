import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Key",
  tableName: "keys",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    key: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
  },
});
