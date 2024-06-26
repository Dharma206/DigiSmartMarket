'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Market.belongsTo(models.User, {
        foreignKey: 'userId', as: 'marketAdmin'
      })
    }
  }
  Market.init({
    userId: DataTypes.INTEGER,
    marketName: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};