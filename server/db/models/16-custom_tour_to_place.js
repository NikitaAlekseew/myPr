'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custom_tour_to_place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custom_tour_to_place.init({
    custom_tour_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Custom_tour_to_place',
  });
  return Custom_tour_to_place;
};