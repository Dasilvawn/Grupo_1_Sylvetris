const express = require("express");
const router = express.Router();
const { getCategoriesApi,
        getCreateCategory,
        postCreateCategoryApi,
        getEditCategoryApi,
        putEditCategoryApi,
        deleteCategoryApi } = require("../controllers/api/categoryApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");
const { errorsCheck } = require("../middlewares/errorsCheck");
const { tokenCheck } = require("../middlewares/tokenCheck");
const { uploadImageAvatar } = require("../middlewares/uploadFile");

//api/users
router.get("/" ,tokenCheck, getCategoriesApi);
router.get("/:id",tokenCheck ,getCreateCategory);
router.post("/",tokenCheck, uploadImageAvatar.array("avatar", 1), postCreateCategoryApi);
router.put("/:id", tokenCheck, putEditCategoryApi);
router.delete("/:id", tokenCheck, deleteCategoryApi);

module.exports = router;