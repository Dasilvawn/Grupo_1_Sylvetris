const express = require("express");
const { getCategoriesApi, getCategoryApi, postCategoryApi, putCategoryApi, deleteCategoryApi } = require("../controllers/api/categoryApiController");

const router = express.Router();




//api/category
router.get ("/", getCategoriesApi);
router.get("/:id", getCategoryApi);
router.post("/",  postCategoryApi);
router.put("/:id", putCategoryApi);
router.delete("/:id",  deleteCategoryApi);


module.exports = router;