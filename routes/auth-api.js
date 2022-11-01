const express = require("express");
const { authLoginApi } = require("../controllers/api/authApiController");
const router = express.Router();

router.post("/login", authLoginApi);


module.exports = router;