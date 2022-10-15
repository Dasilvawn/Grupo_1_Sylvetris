const { check } = require("express-validator");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("El nombre debe tener entre 5 y 20 caracteres"),
  check("sub_titulo")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("El subtitulo debe tener entre 5 y 20 caracteres"),

  check("slug")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("Debe tener entre 5 y 20 caracteres"),
  //mensaje de error de slug

  check("categoria").notEmpty().withMessage("*Requerido").bail(),
  check("stock")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Solo números positivos"),
  check("destacado").notEmpty().withMessage("*Requerido"),

  check("descripcion")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 500,
    })
    .withMessage("La descripción debe tener entre 5 y 500 caracteres"),
  check("descripcion_altura")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("La descripción debe tener entre 5 y 50 caracteres"),
  check("descripcion_maceta")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("La descripción debe tener entre 5 y 50 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio es requerido")
    .bail()
    .isNumeric()
    .withMessage("Solo números "),
  check("cuidados")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isLength({
      min: 5,
      max: 500,
    })
    .withMessage("Debe tener entre 5 y 500 caracteres"),
  check("agua")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Solo números positivos"),
  check("luz")
    .notEmpty()
    .withMessage("*Requerido")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Solo números positivos"),
];
