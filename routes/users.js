const express = require('express');
const router = express.Router();
const {postLogin, postRegister, login, register} = require('../controllers/userControllers');

/* /usuario */
router.get('/login', login);
router.post('/login', postLogin);

router.get('/register', register);
router.post('/register', postRegister);

module.exports = router;