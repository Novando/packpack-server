'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orderDetail.init({
    orderId: DataTypes.BIGINT.UNSIGNED,
    productId: DataTypes.BIGINT.UNSIGNED,
    productCustomId: DataTypes.BIGINT.UNSIGNED,
    materialId: DataTypes.BIGINT.UNSIGNED,
    discountId: DataTypes.BIGINT.UNSIGNED,
    shipping: DataTypes.STRING,
    length: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    subtotal: DataTypes.DOUBLE.UNSIGNED,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orderDetail',
  });
  return orderDetail;
};