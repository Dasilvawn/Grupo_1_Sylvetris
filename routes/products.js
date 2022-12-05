const express = require("express");
const router = express.Router();
const {
  productDetail,
  productCart,
  products,
  productCategory,
  productApiDetail,
  checkout,
  finish
} = require("../controllers/productCotroller");

/* /productos */

/* todos los productos */
router.get("/", products);
router.get("/carrito", productCart);

/*por catogoria */
router.get("/categoria/:id", productCategory);

/* un producto */
router.get("/detalle/:id", productDetail);

router.get("/checkout", checkout);
router.get("/pedido_confirmado", finish);


router.get("/api/detalle/:id", productApiDetail);



module.exports = router;