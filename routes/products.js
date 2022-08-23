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

/*por catogoria */
router.get("/:categoria", productCategory);

/* un producto */
router.get("/detalle/:id", productDetail);

router.get("/carrito", productCart);


module.exports = router;
