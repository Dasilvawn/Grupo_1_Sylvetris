const express = require("express");
const router = express.Router();
const { productDetail, productCart } = require("../controllers/productCotroller");


/* /productos */
router.get("/detalle/:id", productDetail);
router.get("/carrito", productCart);


module.exports = router;



