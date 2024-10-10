"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // с достопримечательностью связано много изображений
      // изображение связано с одной достопримечательнсотью
      this.hasMany(models.Place_image, { foreignKey: "place_id" });

      // связь достопримечательнстей и туров через таблицу связку tour_to_places
      this.belongsToMany(models.Tour, {
        foreignKey: "place_id",
        through: "Tour_to_place",
      });

      // связь достопримечательнстей и КАСТОМНЫХ туров через таблицу связку Custom_tour_to_place
      this.belongsToMany(models.Custom_tour, {
        foreignKey: "place_id",
        through: "Custom_tour_to_place",
      });
    }
  }
  Place.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
