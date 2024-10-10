'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // каждый тур будет связан с одной категорией,
      // а одна категория может быть связана с множеством туров.
      this.hasMany(models.Tour, { foreignKey: "category_id" });
    }
  }
  Tour_category.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tour_category',
  });
  return Tour_category;
};