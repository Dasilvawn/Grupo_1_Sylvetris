const db = require("../database/models");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const loginUser = await db.User.findOne({
          where: { id_social: profile.id },
        });
        if (!loginUser) {
          const newUser = await db.User.create({
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            password: null,
            dni: null,
            phone: null,
            rolId: 2,
            avatar: profile.photos[0].value,
            id_social: profile.id,
            social_provider: "google",
          });
          const newAddress = await db.Address.create({
            address: null,
            dto: null,
            floor: null,
            country: null,
            state: null,
            city: null,
            cp: null,
            userId: newUser.id,
          });
          return done(null, newUser);
        } else {
          return done(null, loginUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(">>>>>>>>>>>>>>>serializeUser", user);

  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});
