const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("*Requerido")
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