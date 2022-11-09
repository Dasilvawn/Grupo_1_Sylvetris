const express = require("express");
const router = express.Router();
const { getApi, getApi, postsApi } = require("../controllers/api/productsApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");
const { errorsCheck } = require("../middlewares/errorsCheck");
const { tokenCheck } = require("../middlewares/tokenCheck");
const { uploadImageAvatar } = require("../middlewares/uploadFile");

//api/users
router.get("/" , tokenCheck, errorsCheck,  getUsersApi);
router.get("/:id", getUserApi);
router.post("/", uploadImageAvatar.array("avatar", 1), postUsersApi);
router.put("/:id");
router.delete("/:id");

module.exports = router;