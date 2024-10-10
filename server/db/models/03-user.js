"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Связь: один пользователь имеет один токен
      this.hasOne(models.Token, { foreignKey: "user_id" });

      // каждый пользователь будет связан с одной ролью,
      // а одна роль может быть связана с разными пользователями.
      this.belongsTo(models.Role, { foreignKey: "role_id" });

      // каждый пользователь будет связан с одним городом,
      // а город может быть связан с разными пользователями.
      this.belongsTo(models.City, { foreignKey: "city_id" });

      // пользователь гид связан с разными турами,
      // а тур может быть связан с одним гидом.
      this.hasMany(models.Tour, { foreignKey: "guide_id" });

      // пользователь гид связан с разными постами,
      // а пост может быть связан с одним гидом.
      this.hasMany(models.Post, { foreignKey: "created_by" });

      // связь туров и юзеров через Favorites
      this.belongsToMany(models.Tour, {
        foreignKey: "user_id",
        through: "Favourites",
      });

      // связь туров и юзеров через Bookings
      this.belongsToMany(models.Tour, {
        foreignKey: "user_id",
        through: "Bookings",
      });

      // связь туров и юзеров через Feedback
      this.belongsToMany(models.Tour, {
        foreignKey: "user_id",
        through: "Feedbacks",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_activated: DataTypes.BOOLEAN,
      activation_link: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      about: DataTypes.TEXT,
      phone: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
