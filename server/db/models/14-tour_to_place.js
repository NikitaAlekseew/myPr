'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_to_place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tour_to_place.init({
    tour_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_to_place',
  });
  return Tour_to_place;
};