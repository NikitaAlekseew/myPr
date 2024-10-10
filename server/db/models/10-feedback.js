"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // связь туров и юзеров через Feedback
      // юзер может заказать оставлять отзыв на разные туры
      // у тура может быть оценка от разных юзеров
      this.belongsTo(models.Tour, { foreignKey: "tour_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Feedback.init(
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      tour_id: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
