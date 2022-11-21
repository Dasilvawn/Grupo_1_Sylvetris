const { check } = require("express-validator")
const { errorsCheck } = require("../middlewares/errorsCheck")
const { tokenCheck } = require("../middlewares/tokenCheck")
const { existUserById, existUserByEmail } = require("../utils/db_validator")

const getUserApiValidation = [
    tokenCheck,
    check("id", "No es un ID válido").isNumeric(),
    check("id").custom(existUserById),
    errorsCheck,
]
const postUserApiValidation = [
    tokenCheck,
    //name
    check("name", "El nombre es obligatorio").notEmpty(),
    check("name", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/),
    check("name", "Como mínimo 2 caracteres").isLength({min: 2,}),
    //lastname
    check("lastname", "El apellido es obligatorio").notEmpty(),
    check("lastname", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/),
    check("lastname", "Como mínimo 2 caracteres").isLength({min: 2,}),
    //email
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "Debe ser un email válido").isEmail(),
    check("email").custom(existUserByEmail),
    //password
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "La contraseña debe tener entre 6 y 12 caracteres").isLength({min: 6,max: 12}),
    //phone
    check("phone", "Solo números").matches(/^[0-9+]*$|^NULL$/),
    //dni
    check("dni", "Solo números").matches(/^[0-9+]*$|^NULL$/),
    //address
    check("address", "Solo números y letras").matches(/^[A-Z0-9a-zÁÉÍÓÚáéíóúñÑ ]+$|^ *$/g),
    //country
    check("country", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
    //state
    check("state", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
    //city
    check("city", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
     //cp
    check("cp", "Solo números").matches(/^[0-9+]*$|^NULL$/),
    
   
    errorsCheck,
]
const putUserApiValidation = [
    tokenCheck,
    
    //id
    check("id", "No es un ID válido").isNumeric(),
    check("id").custom(existUserById),
    //name
     check("name", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
    //lastname
     check("lastname", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
     //phone
     check("phone", "Solo números").matches(/^[0-9+]*$|^NULL$/),
     //dni
     check("dni", "Solo números").matches(/^[0-9+]*$|^NULL$/),
     //address
     check("address", "Solo números y letras").matches(/^[A-Z0-9a-zÁÉÍÓÚáéíóúñÑ ]+$|^ *$/g),
     //country
     check("country", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
     //state
     check("state", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
     //city
     check("city", "Solo letras").matches(/^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/),
      //cp
     check("cp", "Solo números").matches(/^[0-9+]*$|^NULL$/),
   
     errorsCheck,
]
const deleteUserApiValidation = [
    tokenCheck,
    check("id", "No es un ID válido").isNumeric(),
    check("id").custom(existUserById),
    errorsCheck,
]

module.exports = {
    getUserApiValidation,
    postUserApiValidation,
    putUserApiValidation,
    deleteUserApiValidation
}