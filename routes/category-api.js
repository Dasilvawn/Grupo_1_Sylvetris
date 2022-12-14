const express = require("express");
const router = express.Router();
const { getCategoriesApi, getCategoryApi, postCategoryApi,  putCategoryApi,  deleteCategoryApi} = require("../controllers/api/categoryApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");

const { tokenCheck } = require("../middlewares/tokenCheck");

// api/category
router.get("/", tokenCheck, getCategoriesApi,); //funciona sin el token
router.get("/:id",tokenCheck ,getCategoryApi); //funca sin token
router.post("/", tokenCheck, postCategoryApi); 
router.put("/:id", tokenCheck, putCategoryApi);
router.delete("/:id",tokenCheck, deleteCategoryApi);

module.exports = router;
