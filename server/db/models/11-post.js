"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // пользователь гид связан с разными постами,
      // а пост может быть связан с одним гидом.
      this.belongsTo(models.User, { foreignKey: "created_by" });
    }
  }
  Post.init(
    {
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
