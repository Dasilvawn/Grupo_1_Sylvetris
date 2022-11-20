const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { getCategoriesApi, getCategoryApi, postCreateCategoryApi,  putEditCategoryApi,  deleteCategoryApi} = require("../controllers/api/categoryApiController");
=======
const {
  getCategoriesApi,
  getCreateCategory,
  postCreateCategoryApi,
  putEditCategoryApi,
  deleteCategoryApi,
} = require("../controllers/api/categoryApiController");
>>>>>>> e8d9ccb189578f3546caffd123fe128dad9c4b65
const adminUserCheck = require("../middlewares/adminUserCheck");

const { tokenCheck } = require("../middlewares/tokenCheck");

<<<<<<< HEAD
// api/category
router.get("/" ,tokenCheck, getCategoriesApi,); //funciona sin el tocken
router.get("/:id",tokenCheck ,getCategoryApi);
router.post("/",tokenCheck, uploadImageAvatar.array("avatar", 1), postCreateCategoryApi);
router.put("/:id", tokenCheck,  putEditCategoryApi);
router.delete("/:id", tokenCheck,  deleteCategoryApi);
=======
//api/category
router.get("/", getCategoriesApi);
router.get("/:id", getCreateCategory);
router.post("/", tokenCheck, adminUserCheck, postCreateCategoryApi);
router.put("/:id", tokenCheck, adminUserCheck, putEditCategoryApi);
router.delete("/:id", tokenCheck, adminUserCheck, deleteCategoryApi);
>>>>>>> e8d9ccb189578f3546caffd123fe128dad9c4b65

module.exports = router;
