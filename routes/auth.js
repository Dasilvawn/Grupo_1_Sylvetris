const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleSignin } = require("../controllers/userControllers");

require("../utils/google_auth");

//auth

//google auth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/usuario/login",
  }),
  googleSignin
);

module.exports = router;
