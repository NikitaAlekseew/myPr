"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // с туром будет связано много картинок,
      // а одна картинка может быть связана с одним туром.
      this.belongsTo(models.Tour, { foreignKey: "tour_id" });
    }
  }
  Tour_image.init(
    {
      image: DataTypes.STRING,
      tour_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tour_image",
    }
  );
  return Tour_image;
};
