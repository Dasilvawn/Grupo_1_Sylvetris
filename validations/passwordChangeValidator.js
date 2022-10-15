const { check, body } = require("express-validator");
const users = require("../data/db").loadUsers();
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

module.exports = [
  body("password_old")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .custom((value, { req }) => {
      /*  let user = users.find(user =>  bcryptjs.compareSync(value,user.password));
            return !!user */
      return db.User.findByPk(req.session.userLogin.id).then((user) => {
        if (!bcryptjs.compareSync(value, user.password)) {
          return Promise.reject("*Contraseña incorrecta!");
        }
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage("La contraseña debe tener entre 6 y 12 caracteres"),
  body("password2")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Las contraseñas no coinciden"),
];