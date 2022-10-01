"use strict";

const addresses = [
  {
    address: null,
    dto: null,
    floor: null,
    country: null,
    state: null,
    city: null,
    cp: null,
    userId: 1,
    createdAt: new Date(),
  },
  {
    address: null,
    dto: null,
    floor: null,
    country: null,
    state: null,
    city: null,
    cp: null,
    userId: 2,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", addresses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
