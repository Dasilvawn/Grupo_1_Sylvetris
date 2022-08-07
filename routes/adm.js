const express = require("express");
const router = express.Router();
const { editProduct, createProduct } = require("../controllers/admController");

/* /admin */
router.get("/editProduct", editProduct);
router.get("/createProduct", createProduct);

module.exports = router;