'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email         : DataTypes.STRING,
    username      : DataTypes.STRING,
    password      : DataTypes.STRING,
    isVerified    : DataTypes.BOOLEAN,
    isActive      : DataTypes.BOOLEAN,
    avatar        : DataTypes.STRING,
    role          : DataTypes.STRING,
    token         : DataTypes.STRING,
    firstName     : DataTypes.STRING,
    lastName      : DataTypes.STRING,
    createdBy     : DataTypes.STRING,
    modifiedBy    : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};