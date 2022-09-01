const { check, body } = require("express-validator");
const users = require("../data/db").loadUsers();

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido'),
        
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value,user.password));
            return !!user
        }).withMessage('La contraseña no es valida'), 
]