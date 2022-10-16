"use strict";
const { hashSync } = require("bcryptjs");

const users = [
  {
    name: "admin",
    lastname: "admin",
    email: "admin@gmail.com",
    password: hashSync("123456", 10),
    dni: null,
    phone: null,
    avatar: "user_default.png",
    rolId: 1,
    createdAt: new Date(),
  },
  {
    name: "user",
    lastname: "user",
    email: "user@gmail.com",
    password: hashSync("123456", 10),
    dni: null,
    phone: null,
    avatar: "user_default.png",
    rolId: 2,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
