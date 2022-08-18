const express = require("express");
const router = express.Router();
const {
  productDetail,
  productCart,
  products
} = require("../controllers/productCotroller");

/* /productos */

/*** todos los productos ***/
router.get("/", products);

/*** un producto ***/
router.get("/detalle/:id", productDetail);

router.get("/carrito", productCart);

module.exports = router;
