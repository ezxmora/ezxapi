export default (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
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

  Author.associate = (models) => {
    models.author.hasMany(models.quote, { foreignKey: "authorId" });
  };

  return Author;
};
