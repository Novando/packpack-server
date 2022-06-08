'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: 'orders',
          },
          key: 'id'
        },
        allowNull: false
      },
      productId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materialId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      materialName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      length: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      width: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      weight: {
        type: Sequelize.DOUBLE.UNSIGNED,
        validate: {
          isDecimal: true
        },
        allowNull: false
      },
      qty: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      subtotal: {
        type: Sequelize.DOUBLE.UNSIGNED,
        validate: {
          isDecimal: true
        },
        allowNull: false
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modifiedBy: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('orderDetails');
  }
};