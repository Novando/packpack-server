'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
    name        : DataTypes.STRING,
    variant     : DataTypes.STRING,
    shape       : DataTypes.STRING,
    description : DataTypes.TEXT,
    mainImg     : DataTypes.STRING,
    mockupImgs  : DataTypes.TEXT,
    designFiles : DataTypes.TEXT,
    bestWidth   : DataTypes.INTEGER,
    bestLength  : DataTypes.INTEGER,
    category    : DataTypes.STRING,
    tags        : DataTypes.TEXT,
    createdBy   : DataTypes.STRING,
    modifiedBy  : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};