'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
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
      isMain: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      recipient: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isNumeric: true
        }
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      province: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      ward: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      address1: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      address2: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: true
        }
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
    await queryInterface.dropTable('addresses');
  }
};