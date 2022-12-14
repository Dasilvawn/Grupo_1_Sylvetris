const express = require("express");
const { postOrder, getOrders, getOrder, putOrder, deleteOrder } = require("../controllers/api/checkoutApiController");
const router = express.Router();


/* /api/checkout */

/* todos los productos */
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", postOrder);
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);




module.exports = router;