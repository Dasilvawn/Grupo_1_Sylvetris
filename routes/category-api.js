const express = require("express");
const router = express.Router();
const {
  getCategoriesApi,
  getCreateCategory,
  postCreateCategoryApi,
  putEditCategoryApi,
  deleteCategoryApi,
} = require("../controllers/api/categoryApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");

const { tokenCheck } = require("../middlewares/tokenCheck");

//api/category
router.get("/", getCategoriesApi);
router.get("/:id", getCreateCategory);
router.post("/", tokenCheck, adminUserCheck, postCreateCategoryApi);
router.put("/:id", tokenCheck, adminUserCheck, putEditCategoryApi);
router.delete("/:id", tokenCheck, adminUserCheck, deleteCategoryApi);

module.exports = router;
