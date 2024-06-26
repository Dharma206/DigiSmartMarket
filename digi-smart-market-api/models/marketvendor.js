'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketVendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarketVendor.belongsTo(models.User, {
        foreignKey: 'userId', as: 'marketVendor'
      })
      MarketVendor.belongsTo(models.Market, {
        foreignKey: 'marketId'
      })
    }
  }
  MarketVendor.init({
    userId: DataTypes.INTEGER,
    marketId: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MarketVendor',
  });
  return MarketVendor;
};