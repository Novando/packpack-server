'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      shape: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'custom',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      variant: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      mainImg: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      mockupImgs: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
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
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'uncategorized',
      },
      tags: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
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
    await queryInterface.dropTable('products');
  }
};