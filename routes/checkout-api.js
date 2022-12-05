const express = require("express");
const { postCart } = require("../controllers/api/checkoutApiController");
const router = express.Router();


/* /api/checkout */

/* todos los productos */
router.post("/cart", postCart);




module.exports = router;