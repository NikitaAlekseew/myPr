"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // связь туров и юзеров через Booding
      // юзер может заказать разные туры
      // тур может быть в заказе у разных юзеров
      this.belongsTo(models.Tour, { foreignKey: "tour_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Booking.init(
    {
      user_id: DataTypes.INTEGER,
      tour_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      number_of_booking_participants: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
