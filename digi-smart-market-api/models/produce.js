'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Produce.init({
    vendorId: DataTypes.INTEGER,
    cropName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    laborerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produce',
  });
  return Produce;
};