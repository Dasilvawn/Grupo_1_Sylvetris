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
    .withMessage("*Debe ser un email válido")
    .bail()
    .custom((value, { req }) => {
      let user = users.find((user) => user.email === value.trim());
      return !!!user;
    })
    .withMessage("*El email ya se encuentra registrado"),

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
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric()
    .withMessage("*Solo numeros")
    .bail()
    .isMobilePhone()
    .withMessage("*Formato invalido"),

  check("dni")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric()
    .withMessage("Solo numeros")
    .bail()
    .isLength({
      min: 7,
      max: 8,
    })
    .withMessage("*Formato invalido"),

  check("address")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("*Solo letras y números"),

  //body("floor").isAlphanumeric().withMessage("*Formato invalido"),

  //check("dpto").isAlphanumeric().withMessage("*Formato invalido"),

  check("state")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("*Solo letras"),

  check("city")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("*Solo letras"),

  check("cp")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric()
    .withMessage("Solo números"),
];
