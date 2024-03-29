export default (sequelize, DataTypes) => {
  const Quote = sequelize.define(
    "quote",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      quote: {
        type: DataTypes.STRING,
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

  Quote.associate = (models) => {
    models.quote.belongsTo(models.author);
  };

  return Quote;
};
