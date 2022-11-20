const express = require("express");
const router = express.Router();
const { getCategoriesApi, getCategoryApi, postCategoryApi,  putCategoryApi,  deleteCategoryApi} = require("../controllers/api/categoryApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");

const { tokenCheck } = require("../middlewares/tokenCheck");

// api/category
router.get("/" ,tokenCheck, getCategoriesApi,); //funciona sin el tocken
router.get("/:id",tokenCheck ,getCategoryApi);
router.post("/",tokenCheck, uploadImageAvatar.array("avatar", 1), postCategoryApi);
router.put("/:id", tokenCheck,  putCategoryApi);
router.delete("/:id", tokenCheck,  deleteCategoryApi);

module.exports = router;
