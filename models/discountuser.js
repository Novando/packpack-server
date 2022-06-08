'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discountUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  discountUser.init({
    discountId: DataTypes.BIGINT.UNSIGNED,
    userId: DataTypes.BIGINT.UNSIGNED,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discountUser',
  });
  return discountUser;
};