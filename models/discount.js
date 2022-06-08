'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  discount.init({
    ruleId: DataTypes.BIGINT.UNSIGNED,
    voucher: DataTypes.STRING,
    discountValue: DataTypes.DOUBLE.UNSIGNED,
    maxCashback: DataTypes.DOUBLE.UNSIGNED,
    minPrice: DataTypes.DOUBLE.UNSIGNED,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};