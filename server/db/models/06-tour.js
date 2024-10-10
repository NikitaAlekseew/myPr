"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // каждый тур будет связан с одной категорией,
      // а одна категория может быть связана с множеством туров.
      this.belongsTo(models.Tour_category, { foreignKey: "category_id" });

      // с туром будет связано много картинок,
      // а одна картинка может быть связана с одним туром.
      this.hasMany(models.Tour_image, { foreignKey: "tour_id" });

      // каждый тур будет связан с одним городом,
      // а город может быть связан с разными турами.
      this.belongsTo(models.City, { foreignKey: "city_id" });

      // пользователь гид связан с разными турами,
      // а тур может быть связан с одним гидом.
      this.belongsTo(models.User, { foreignKey: "guide_id" });

      // связь туров и юзеров через Favorites
      this.belongsToMany(models.User, {
        foreignKey: "tour_id",
        through: "Favourites",
      });

      // связь туров и юзеров через Bookings
      this.belongsToMany(models.User, {
        foreignKey: "tour_id",
        through: "Bookings",
      });

      // связь туров и юзеров через Feedback
      this.belongsToMany(models.User, {
        foreignKey: "tour_id",
        through: "Feedbacks",
      });

      // связь туров и достопримечательнстей через таблицу связку tour_to_places
      this.belongsToMany(models.Place, {
        foreignKey: "tour_id",
        through: "Tour_to_place",
      });
    }
  }
  Tour.init(
    {
      category_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      schegule: DataTypes.STRING,
      duration: DataTypes.STRING,
      start_time: DataTypes.STRING,
      guide_id: DataTypes.INTEGER,
      number_of_tour_participants: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      city_id: DataTypes.STRING,
      views: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
