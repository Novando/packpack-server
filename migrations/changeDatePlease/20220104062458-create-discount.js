'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('discounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      ruleId: {
        type: Sequelize.BIGINT.UNSIGNED,
        validate: {
          isUppercase: true,
        }
      },
      voucher: {
        type: Sequelize.STRING,
        validate: {
          isAlphanumeric: true
        }
      },
      discountValue: {
        type: Sequelize.DOUBLE.UNSIGNED,
        validate: {
          max: 100,
          isDecimal: true
        }
      },
      maxCashback: {
        type: Sequelize.DOUBLE.UNSIGNED,
        validate: {
          isDecimal: true
        }
      },
      minPrice: {
        type: Sequelize.DOUBLE.UNSIGNED,
        validate: {
          isDecimal: true
        }
      },
      createdBy: {
        type: Sequelize.STRING
      },
      modifiedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('discounts');
  }
};