const express = require("express");
const router = express.Router();
const {getApiProducts, getApiProduct, postApiProduct, putApiProduct, deleteApiProduct, getApiProductsImages, getApiProductImage, postApiProductImage, putApiProductImage, deleteApiProductImage } = require("../controllers/api/productsApiController");


//api/products
router.get("/" , getApiProducts);
router.get("/:id", getApiProduct);
router.post("/",  postApiProduct);
router.put("/:id" , putApiProduct);
router.delete("/:id", deleteApiProduct);
//api/products/image
router.get("/image/" , getApiProductsImages);
router.get("/image/:id", getApiProductImage);
router.post("/image/",  postApiProductImage);
router.put("/image/:id" , putApiProductImage);
router.delete("/image/:id", deleteApiProductImage);

module.exports = router;