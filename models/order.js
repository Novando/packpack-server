'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  order.init({
    invoice: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    recipient: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    zip: DataTypes.STRING,
    shipment: DataTypes.STRING,
    shipmentCost: DataTypes.DOUBLE.UNSIGNED,
    paymentMethod: DataTypes.STRING,
    total: DataTypes.DOUBLE.UNSIGNED,
    status: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};