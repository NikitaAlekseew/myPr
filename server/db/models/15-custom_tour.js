"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Custom_tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // связь КАСТОМНЫХ туров и достопримечательнстей через таблицу связку Custom_tour_to_place
      this.belongsToMany(models.Place, {
        foreignKey: "custom_tour_id",
        through: "Custom_tour_to_place",
      });
    }
  }
  Custom_tour.init(
    {
      title: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Custom_tour",
    }
  );
  return Custom_tour;
};
