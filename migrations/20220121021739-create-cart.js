'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
      },
      productId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id'
        },
      },
      productCustomId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: {
            tableName: 'productCustoms',
          },
          key: 'id'
        },
      },
      materialId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: 'materials',
          },
          key: 'id'
        },
      },
      length: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      width: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      qty: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modifiedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('carts');
  }
};