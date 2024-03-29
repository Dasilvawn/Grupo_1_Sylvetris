var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require('cors')

var passport = require("passport");

const methodOverride = require("method-override");
const session = require("express-session");

const localsUserCheck = require("./middlewares/localsUserCheck");
const cookieCheck = require("./middlewares/cookieCheck");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var admRouter = require("./routes/adm");
var authRouter = require("./routes/auth");

const userApiRouter = require("./routes/user-api");
const authApiRouter = require("./routes/auth-api");
const productsApiRouter = require("./routes/products-api");
const categoryApiRouter = require("./routes/category-api");
const checkout = require("./routes/checkout-api");
const imagesKit = require("./routes/imagesKit");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "askfjhah134654asDGGD$/aksjh",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cookieCheck);
app.use(localsUserCheck);

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/productos", productsRouter);
app.use("/usuario", usersRouter);
app.use("/admin", admRouter);
app.use("/auth", authRouter);

app.use("/api/users", userApiRouter);
app.use("/api/auth", authApiRouter);
app.use("/api/category", categoryApiRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/imageKit", imagesKit);
app.use("/api/checkout", checkout);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
