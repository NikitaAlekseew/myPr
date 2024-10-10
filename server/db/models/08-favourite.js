"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // связь туров и юзеров через Favorites
      this.belongsTo(models.Tour, { foreignKey: "tour_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Favourite.init(
    {
      tour_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favourite",
    }
  );
  return Favourite;
};
