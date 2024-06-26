'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laborer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laborer.belongsTo(models.MarketVendor, {
        foreignKey: 'marketVendorId'
      })
      Laborer.hasMany(models.Produce, {
        foreignKey: 'laborerId'
      })
    }
  }
  Laborer.init({
    marketVendorId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    code: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Laborer',
  });
  return Laborer;
};