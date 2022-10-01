'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      sub_titulo: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      destacado: {
        type: Sequelize.BOOLEAN
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      descripcion_altura: {
        type: Sequelize.STRING
      },
      descripcion_maceta: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      cuidados: {
        type: Sequelize.TEXT
      },
      agua: {
        type: Sequelize.INTEGER
      },
      luz: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};