"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // каждый пользователь будет связан с одной ролью,
      // а одна роль может быть связана с разными пользователями.
      this.hasMany(models.User, { foreignKey: "role_id" });
    }
  }
  Role.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
