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
      Produce.belongsTo(models.Laborer, {
        foreignKey: 'laborerId'
      })
    }
  }
  Produce.init({
    cropName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    details: DataTypes.STRING,
    laborerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produce',
  });
  return Produce;
};