'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  material.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    width: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'material',
  });
  return material;
};