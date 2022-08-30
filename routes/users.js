const express = require("express");
const router = express.Router();
const {
  postLogin,
  postRegister,
  login,
  register,
  profile,
  rename,
  change_password,
} = require("../controllers/userControllers");
const publicRoute = require("../middlewares/publicRoute");
const registerValidator = require("../validations/registerValidator");

/* /usuario */
router.get("/login", publicRoute, login);
router.post("/login", postLogin);

router.get("/register", publicRoute, register);
router.post("/register", registerValidator, postRegister);

router.get("/perfil", profile);
router.get("/perfil/cambiar_nombre", rename);
router.get("/perfil/cambiar_password", change_password);

module.exports = router;
