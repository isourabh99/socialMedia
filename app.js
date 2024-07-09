// configure dotenv file
var env = require("dotenv").config({ path: "./.env" });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var indexRouter = require("./routes/index.routes");
var userRouter = require("./routes/user.routes");
const passport = require("passport");
const userModel = require("./models/user.schema");
// file uploader
const fileUpload = require("express-fileupload");

var app = express();

// configure database
require("./config/socialMediaDatabase").connectionDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// fileuploader imagekit
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
// session set before setting the routes for Routers
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// setting the routes for Routers
app.use("/", indexRouter);
app.use("/user", userRouter);

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
