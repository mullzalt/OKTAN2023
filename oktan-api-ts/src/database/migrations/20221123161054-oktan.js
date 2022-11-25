'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    [
      await queryInterface.createTable('user', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        verified: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: 0
        },
        roles: {
          type: Sequelize.ENUM('peserta', 'panitia', 'admin'),
          allowNull: true,
          defaultValue: "peserta"
        }
      }),
    ]

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
