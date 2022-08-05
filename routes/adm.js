const express = require("express");
const router = express.Router();
const {editProduct } = require("../controllers/admController");


/* /admin */
router.get("/editProducts", editProduct);


module.exports = router;
