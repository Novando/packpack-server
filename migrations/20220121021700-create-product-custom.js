'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productCustoms', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      shape: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'custom',
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      variantName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      designFiles: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      bestWidth: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      bestLength: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isNumeric: true
        }
      },
      modifiedBy: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('productCustoms');
  }
};