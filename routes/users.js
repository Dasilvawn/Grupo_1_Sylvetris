const express = require("express");
const router = express.Router();
const {
  address,
  change_address,
  change_password,
  login,
  postLogin,
  postRegister,
  profile,
  putChange_address,
  putChange_password,
  putRename,
  register,
  rename,
} = require("../controllers/userControllers");
const publicRoute = require("../middlewares/publicRoute");
const { uploadImageProduct } = require("../middlewares/uploadFile");
const addressChangeValidator = require("../validations/addressChangeValidator");
const editUserProfileValidator = require("../validations/editUserProfileValidator");
const passwordChangeValidator = require("../validations/passwordChangeValidator");
const registerValidator = require("../validations/registerValidator");

/* /usuario */
router.get("/login", publicRoute, login);
router.post("/login", postLogin);

router.get("/register", publicRoute, register);
router.post("/register", registerValidator, postRegister);

router.get("/perfil/:id", profile);

router.get("/perfil/:id/cambiar_nombre", rename);
router.put(
  "/perfil/:id/cambiar_nombre",
  uploadImageProduct.array("image", 1),
  editUserProfileValidator,
  putRename
);

router.get("/perfil/:id/cambiar_password", change_password);
router.put(
  "/perfil/:id/cambiar_password",
  passwordChangeValidator,
  putChange_password
);

router.get("/perfil/:id/direccion", address);

router.get("/perfil/:id/cambiar_direccion", change_address);
router.put(
  "/perfil/:id/cambiar_direccion",
  addressChangeValidator,
  putChange_address
);

module.exports = router;