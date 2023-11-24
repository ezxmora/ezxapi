export default (sequelize, DataTypes) => {
  const Key = sequelize.define(
    "key",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      key: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.updatedAt;
          delete record.dataValues.createdAt;
        },
        afterUpdate: (record) => {
          delete record.dataValues.updatedAt;
          delete record.dataValues.createdAt;
        },
      },
    }
  );

  return Key;
};
