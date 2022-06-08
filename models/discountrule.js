'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discountRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  discountRule.init({
    name: DataTypes.STRING,
    rule: DataTypes.STRING,
    ruleValue: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discountRule',
  });
  return discountRule;
};