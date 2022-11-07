const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("*El nombre es obligatorio")
    .bail()
    .matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/)
    .withMessage("*Solo letras")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("*Como mínimo 2 caracteres"),
  check("lastname")
    .notEmpty()
    .withMessage("*El apellido es obligatorio")
    .bail()
    .matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/)
    .withMessage("*Solo letras")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("*Como mínimo 2 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("*El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("*Debe ser un email válido"),

  body("email").custom((value) => {
    return db.User.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (user) {
        return Promise.reject("Este email ya está registrado");
      }
    });
  }),

  check("password")
    .notEmpty()
    .withMessage("*La contraseña es obligatoria")
    .bail()
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage("*La contraseña debe tener entre 6 y 12 caracteres"),

  body("password2")
    .notEmpty()
    .withMessage("*La contraseña es obligatoria")
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
