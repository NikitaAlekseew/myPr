"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Place_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // с достопримечательностью связано много изображений
      // изображение связано с одной достопримечательнсотью
      this.belongsTo(models.Place, { foreignKey: "place_id" });
    }
  }
  Place_image.init(
    {
      image: DataTypes.STRING,
      place_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Place_image",
    }
  );
  return Place_image;
};
