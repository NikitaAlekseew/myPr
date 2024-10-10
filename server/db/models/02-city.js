"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // каждый пользователь будет связан с одним городом,
      // а город может быть связан с разными пользователями.
      this.hasMany(models.User, { foreignKey: "city_id" });

      // каждый тур будет связан с одним городом,
      // а город может быть связан с разными турами.
      this.hasMany(models.Tour, { foreignKey: "city_id" });
    }
  }
  City.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
