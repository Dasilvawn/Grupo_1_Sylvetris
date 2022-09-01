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
const { uploadImageProduct } = require("../middlewares/uploadFile");
const editUserValidator = require("../validations/editUserValidator");
const newUserValidator = require("../validations/newUserValidator");



/* /admin */

router.get("/", getDashboard);

//products
router.get("/products", getProducts);

router.get("/products/create_product", getCreateProduct);
router.post("/products/create_product", postCreateProducts);

router.get("/products/edit_product/:id", getEditProducts);
router.put("/products/edit_product/:id", putEditProducts);

router.delete("/products/delete_product/:id", deleteProducts);

//users
router.get("/users", getUsers);

router.get("/users/create_user", getCreateUsers);
router.post("/users/create_user",uploadImageProduct.array('image',1), newUserValidator, postCreateUsers);

router.get("/users/edit_user/:id", getEditUsers);
router.put("/users/edit_user/:id",uploadImageProduct.array('image',1), editUserValidator, putEditUsers);

router.delete("/users/delete_user/:id", deleteUsers);

module.exports = router;
