const {check, body} = require('express-validator');

module.exports = [
     check('nombre')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('El nombre debe tener entre 5 y 20 caracteres'),
     check('sub_titulo')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('El subtitulo debe tener entre 5 y 20 caracteres'),
        
     check('slug')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('Debe tener entre 5 y 20 caracteres'),
        //mensaje de error de slug

     check('categoria')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('La categoria debe tener entre 5 y 20 caracteres'),
     check('stock')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),
     check('destacado')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('Debe tener entre 5 y 20 caracteres'),
     check('descripcion')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 350
        }).withMessage('La descripción debe tener entre 5 y 350 caracteres'),
     check('descripcion_altura')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('La descripción debe tener entre 5 y 50 caracteres'),
     check('descripcion_maceta')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 50
        }).withMessage('La descripción debe tener entre 5 y 50 caracteres'),
     check('precio')
        .notEmpty()
        .withMessage('El precio es requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),
     check('cuidados')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isLength({
            min : 5,
            max : 350
        }).withMessage('Debe tener entre 5 y 350 caracteres'),
     check('agua')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),
     check('luz')
        .notEmpty()
        .withMessage('*Requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),       
    body('imagen')
        .custom((value,{req}) => {
            if(req.files[0]){
                return true
            }else {
                return false
            }
        }).withMessage('Debes agregar dos imagenes')
]