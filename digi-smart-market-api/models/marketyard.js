'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketYard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MarketYard.init({
    marketId: DataTypes.INTEGER,
    yardName: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MarketYard',
  });
  return MarketYard;
};