const express = require("express");
const router = express.Router();
const {
  productDetail,
  productCart,
  products,
  productCategory
} = require("../controllers/productCotroller");

/* /productos */

/* todos los productos */
router.get("/", products);
router.get("/carrito", productCart);

/*por catogoria */
router.get("/categoria/:id", productCategory);

/* un producto */
router.get("/detalle/:id", productDetail);



module.exports = router;