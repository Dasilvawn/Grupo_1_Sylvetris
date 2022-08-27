const express = require('express');
const router = express.Router();
const {postLogin, postRegister, login, register} = require('../controllers/userControllers');
const registerValidator = require('../validations/registerValidator');

/* /usuario */
router.get('/login', login);
router.post('/login', postLogin);

router.get('/register', register);
router.post('/register',registerValidator, postRegister);

module.exports = router;