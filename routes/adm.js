const express = require("express");
const admController = require("../controllers/admController");
const router = express.Router();
const {
  getUsers,
  dashboard,
  store,
  edit,
  update,
  createProduct,
  getProducts,
  deleteProducts,
} = require("../controllers/admController");

/* /admin */

router.get("/", dashboard);

router.get("/createProduct", createProduct);
router.get("/products", getProducts);

/*** editar productos***/
router.get("/editProduct/:id", edit);
router.put("/update/:id", update);

/* Formulario de creación de productos */
router.post("/store", store);

router.delete("/deleteProduct/:id", deleteProducts);

//users
router.get("/users", getUsers);

module.exports = router;
