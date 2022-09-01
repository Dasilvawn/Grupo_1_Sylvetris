const express = require("express");
const router = express.Router();
const {
  postLogin,
  postRegister,
  login,
  register,
} = require("../controllers/userControllers");
const publicRoute = require("../middlewares/publicRoute");

const userMiddle = require('../middlewares/userMiddlewares');

const registerValidator = require("../validations/registerValidator");
const loginValidations = require("../validations/loginValidator");

/* /usuario */
router.get("/login", publicRoute, login);
router.post("/login", loginValidations, postLogin);

router.get("/register", publicRoute, register);
router.post("/register", registerValidator, postRegister);

router.get('./')

module.exports = router;
