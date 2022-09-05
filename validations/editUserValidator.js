const { check, body } = require("express-validator");
const users = require("../data/db").loadUsers();
module.exports = [
  check("name")
    .notEmpty()
    .withMessage("*El nombre es obligatorio")
    .bail()
    .matches(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/)
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
    .matches(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/)
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

  body("password2")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Las contraseñas no coinciden"),
  check("phone")
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage("Formato invalido"),
];
