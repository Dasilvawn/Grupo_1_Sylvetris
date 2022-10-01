const express = require("express");
const { getCategories } = require("../controllers/admin/categoryAdminController");

const router = express.Router();

const { getDashboard } = require("../controllers/admin/indexAdminController");
const {
  getProducts,
  getCreateProduct,
  postCreateProducts,
  getEditProducts,
  putEditProducts,
  deleteProducts,
} = require("../controllers/admin/productAdminController");
const {
  getUsers,
  getCreateUsers,
  postCreateUsers,
  putEditUsers,
  getEditUsers,
  deleteUsers,
} = require("../controllers/admin/userAdminController");
const adminUserCheck = require("../middlewares/adminUserCheck");
const {
  uploadImageProduct,
  uploadImageCreateProduct,
} = require("../middlewares/uploadFile");
const editUserValidator = require("../validations/editUserValidator");
const newUserValidator = require("../validations/newUserValidator");
const productValidator = require("../validations/productAddValidator");
const productsEditValidator = require("../validations/productsEditValidator");

/* /admin */

router.get("/", adminUserCheck, getDashboard);

//products
router.get("/products", adminUserCheck, getProducts);

router.get("/products/create_product", adminUserCheck, getCreateProduct);
router.post(
  "/products/create_product",
  uploadImageCreateProduct.array("imagen", 2),
  productValidator,
  postCreateProducts
);

router.get("/products/edit_product/:id", adminUserCheck, getEditProducts);
router.put(
  "/products/edit_product/:id",
  uploadImageCreateProduct.array("imagen", 2),
  productsEditValidator,
  putEditProducts
);

router.delete("/products/delete_product/:id", adminUserCheck, deleteProducts);

//users
router.get("/users", adminUserCheck, getUsers);

router.get("/users/create_user", adminUserCheck, getCreateUsers);
router.post(
  "/users/create_user",
  uploadImageProduct.array("image", 1),
  newUserValidator,
  postCreateUsers
);

router.get("/users/edit_user/:id", adminUserCheck, getEditUsers);
router.put(
  "/users/edit_user/:id",
  uploadImageProduct.array("image", 1),
  editUserValidator,
  putEditUsers
);

router.delete("/users/delete_user/:id", adminUserCheck, deleteUsers);

//categories
router.get("/categories", adminUserCheck, getCategories);

module.exports = router;
