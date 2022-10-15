const { check, body } = require("express-validator");

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

  check("phone")
    .matches(/^[0-9+]*$|^NULL$/)
    .withMessage("Solo numeros"),

  body("dni")
    .matches(/^[0-9]*$|^NULL$/)
    .withMessage("Solo numeros"),

  check("address")
    .matches(/^[A-Z0-9a-zÁÉÍÓÚáéíóúñÑ ]+$|^ *$/g)
    .withMessage("*Solo letras y numeros"),

  check("country")
    .matches(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/)
    .withMessage("*Solo letras"),

  check("state")
    .matches(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/)
    .withMessage("*Solo letras"),

  check("city")
    .matches(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/)
    .withMessage("*Solo letras"),

  check("cp")
    .matches(/^[0-9]*$|^NULL$/)
    .withMessage("Solo numeros"),
];
