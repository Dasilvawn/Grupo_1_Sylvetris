const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getUsersApi,
  getUserApi,
  postUsersApi,
  getImage,
  putUsersApi,
  deleteUsersApi,
} = require("../controllers/api/userApiController");

const { errorsCheck } = require("../middlewares/errorsCheck");
const { tokenCheck } = require("../middlewares/tokenCheck");
const { uploadImageAvatar } = require("../middlewares/uploadFile");
const {
  getUserApiValidation,
  postUserApiValidation,
  putUserApiValidation,
  deleteUserApiValidation,
} = require("../validations/userApiValidator");

const upload = uploadImageAvatar.single("avatar");

//api/users
router.get ("/", tokenCheck, errorsCheck, getUsersApi);
router.get("/:id", getUserApiValidation, getUserApi);
router.post("/", upload ,postUserApiValidation, postUsersApi);
router.put("/:id",upload, putUserApiValidation, putUsersApi);
router.delete("/:id", deleteUserApiValidation, deleteUsersApi);
//image
router.get("/image/:img", getImage);

module.exports = router;
