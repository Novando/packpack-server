'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  address.init({
    userId: DataTypes.BIGINT.UNSIGNED,
    isMain: DataTypes.BOOLEAN,
    recipient: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    zip: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};