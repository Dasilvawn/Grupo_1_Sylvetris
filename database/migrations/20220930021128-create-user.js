"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      dni: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      
      rolId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Rols",
          },
          key: "id",
        },
      },
      avatar: {
        type: Sequelize.STRING,
      },
      id_social: {
        type: Sequelize.STRING,
      },
      social_provider: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
