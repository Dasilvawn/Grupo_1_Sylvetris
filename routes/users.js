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
  address,
  change_address,

  putRename,
  change_avatar,
} = require("../controllers/userControllers");
const publicRoute = require("../middlewares/publicRoute");
const { uploadImageProduct } = require("../middlewares/uploadFile");
const editUserProfileValidator = require("../validations/editUserProfileValidator");
const registerValidator = require("../validations/registerValidator");

/* /usuario */
router.get("/login", publicRoute, login);
router.post("/login", postLogin);

router.get("/register", publicRoute, register);
router.post("/register", registerValidator, postRegister);

router.get("/perfil/:id", profile);


router.get("/perfil/:id/cambiar_nombre", rename);
router.put("/perfil/:id/cambiar_nombre",uploadImageProduct.array('image',1),editUserProfileValidator, putRename);

router.get("/perfil/:id/cambiar_password", change_password);
router.get("/perfil/:id/direccion", address);
router.get("/perfil/:id/cambiar_direccion", change_address);

module.exports = router;
