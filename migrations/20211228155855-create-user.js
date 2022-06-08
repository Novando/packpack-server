'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          isEmail: true,
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      isVerified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notNull: true,
        }
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      role: {
        allowNull: false,
        defaultValue: 'undefined',
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      isActive: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
        validate: {
          notNull: true,
        }
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      firstName: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      lastName: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      modifiedBy: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};