const express = require("express");
const admController = require("../controllers/admController");
const router = express.Router();
const { edit, update, createProduct, getProducts, deleteProducts } = require("../controllers/admController");

/* /admin */
router.get("/createProduct", createProduct);
router.get("/products", getProducts);

/*** editar productos***/ 
router.get('/editProduct/:id', edit); 
router.put('/update/:id', update); 

router.delete("/deleteProduct/:id", deleteProducts);

module.exports = router;
