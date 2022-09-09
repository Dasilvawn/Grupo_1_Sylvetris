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
  logout,
} = require("../controllers/userControllers");
const privateRoute = require("../middlewares/privateRoute");
const publicRoute = require("../middlewares/publicRoute");
const { uploadImageProduct } = require("../middlewares/uploadFile");
const addressChangeValidator = require("../validations/addressChangeValidator");
const editUserProfileValidator = require("../validations/editUserProfileValidator");
const loginValidator = require("../validations/loginValidator");
const passwordChangeValidator = require("../validations/passwordChangeValidator");
const registerValidator = require("../validations/registerValidator");

/* /usuario */
router.get("/login", publicRoute, login);
router.post("/login",loginValidator, postLogin);

router.get("/register", publicRoute, register);
router.post("/register", registerValidator, postRegister);

router.get("/perfil", privateRoute, profile);

router.get("/perfil/cambiar_nombre",  privateRoute, rename);
router.put(
  "/perfil/cambiar_nombre",
  uploadImageProduct.array("image", 1),
 editUserProfileValidator,
  putRename
);

router.get("/perfil/cambiar_password",  privateRoute, change_password);
router.put(
  "/perfil/cambiar_password",
  passwordChangeValidator,
  putChange_password
);

router.get("/perfil/direccion",  privateRoute, address);

router.get("/perfil/cambiar_direccion",  privateRoute, change_address);
router.put(
  "/perfil/cambiar_direccion",
  addressChangeValidator,
  putChange_address
);

router.get('/logout',logout)

module.exports = router;
