const express = require("express");

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
const { uploadImageProduct, uploadImageCreateProduct } = require("../middlewares/uploadFile");
const editUserValidator = require("../validations/editUserValidator");
const newUserValidator = require("../validations/newUserValidator");
const productValidator = require("../validations/productAddValidator")


/* /admin */

router.get("/", adminUserCheck, getDashboard);

//products
router.get("/products",adminUserCheck, getProducts);

router.get("/products/create_product",adminUserCheck, getCreateProduct);
router.post("/products/create_product", uploadImageCreateProduct.array('imagen', 2),productValidator, adminUserCheck, postCreateProducts);

router.get("/products/edit_product/:id", adminUserCheck, getEditProducts);
router.put("/products/edit_product/:id", uploadImageCreateProduct.array('imagen', 2),productValidator, adminUserCheck, putEditProducts);

router.delete("/products/delete_product/:id", adminUserCheck, deleteProducts);

//users
router.get("/users", adminUserCheck, getUsers);

router.get("/users/create_user", adminUserCheck, getCreateUsers);
router.post("/users/create_user",uploadImageProduct.array('image',1), adminUserCheck, newUserValidator, postCreateUsers);

router.get("/users/edit_user/:id", getEditUsers);
router.put("/users/edit_user/:id",uploadImageProduct.array('image',1), adminUserCheck, editUserValidator, putEditUsers);

router.delete("/users/delete_user/:id", adminUserCheck, deleteUsers);

module.exports = router;