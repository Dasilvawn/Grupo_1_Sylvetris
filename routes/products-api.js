const express = require("express");
const router = express.Router();
const {getApiProducts, getApiProduct, postApiProduct, putApiProduct, deleteApiProduct } = require("../controllers/api/productsApiController");
const adminUserCheck = require("../middlewares/adminUserCheck");
const { errorsCheck } = require("../middlewares/errorsCheck");
const { tokenCheck } = require("../middlewares/tokenCheck");
const { uploadImageAvatar } = require("../middlewares/uploadFile");

//api/products
router.get("/" , getApiProducts);
router.get("/:id", getApiProduct);
router.post("/",  postApiProduct);
router.put("/:id" , putApiProduct);
router.delete("/:id", deleteApiProduct);

module.exports = router;