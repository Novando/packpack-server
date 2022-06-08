'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productCustom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productCustom.init({
    userId      : DataTypes.BIGINT.UNSIGNED,
    brandName   : DataTypes.STRING,
    productName : DataTypes.STRING,
    variantName : DataTypes.STRING,
    shape       : DataTypes.STRING,
    designFiles : DataTypes.TEXT,
    bestWidth   : DataTypes.INTEGER,
    bestLength  : DataTypes.INTEGER,
    createdBy   : DataTypes.STRING,
    modifiedBy  : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productCustom',
  });
  return productCustom;
};