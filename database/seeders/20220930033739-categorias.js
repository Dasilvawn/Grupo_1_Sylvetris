"use strict";

const categories = [
  {
    name: "Suculentas",
    createdAt: new Date(),
   
   
  },
  {
    name: "Captus",
    createdAt: new Date(),
    
  },
  {
    name: "Plantas",
    createdAt: new Date(),
   
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
