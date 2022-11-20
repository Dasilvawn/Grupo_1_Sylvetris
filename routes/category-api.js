const express = require("express");
const router = express.Router();
const { getCategoriesApi, getCategoryApi, postCreateCategoryApi,  putEditCategoryApi,  deleteCategoryApi} = require("../controllers/api/categoryApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");
const { errorsCheck } = require("../middlewares/errorsCheck");
const { tokenCheck } = require("../middlewares/tokenCheck");
const { uploadImageAvatar } = require("../middlewares/uploadFile");

// api/category
router.get("/" ,tokenCheck, getCategoriesApi,); //funciona sin el tocken
router.get("/:id",tokenCheck ,getCategoryApi);
router.post("/",tokenCheck, uploadImageAvatar.array("avatar", 1), postCreateCategoryApi);
router.put("/:id", tokenCheck,  putEditCategoryApi);
router.delete("/:id", tokenCheck,  deleteCategoryApi);

module.exports = router;