"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // Связь: токен принадлежит одному пользователю
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  Token.init(
    {
      user_id: DataTypes.INTEGER,
      refreshToken: DataTypes.STRING(1024), // 1024 чтобы не валилась ошибка original: error: значение не умещается в тип character varying(255)
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
