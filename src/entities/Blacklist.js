export default (sequelize, DataTypes) => {
  const Blacklist = sequelize.define(
    "blacklisted",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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

  return Blacklist;
};
