'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      invoice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
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
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shipment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shipmentCost: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('orders');
  }
};