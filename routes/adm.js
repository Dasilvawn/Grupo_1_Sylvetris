const express = require("express");
const router = express.Router();
const { editProduct, createProduct, getProducts, deleteProducts } = require("../controllers/admController");

/* /admin */
router.get("/editProduct", editProduct);
router.get("/createProduct", createProduct);
router.get("/products", getProducts);

router.delete("/deleteProduct/:id", deleteProducts);

module.exports = router;