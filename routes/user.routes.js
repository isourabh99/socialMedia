var express = require('express');
var router = express.Router();
const userModel = require('../models/user.schema');
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const {isLoggedIn} = require("../middleware/auth")

passport.use(new LocalStrategy(userModel.authenticate()))

router.post("/signup", async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      mobileNum
    } = req.body
    const nonChangableData = {
      username,
      email,
      mobileNum
    }
    const encryptedData = password
    const data = await userModel.register(nonChangableData, encryptedData)
    // console.log(data);
    res.redirect("/user/profile")
  } catch (error) {
    console.log(error.message);
  }
})

// login post route for user login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/user/profile",
  failureRedirect: "/login"
}), (req, res, next) => {})

//  GET profile page. ("aftere login")
router.get('/profile',isLoggedIn,  function (req, res, next) {

 try {
   res.render("profile", {
     title: "Profile",
     user: req.user
   });

 } catch (error) {
  console.log(error.message);
 }
});

// Get route for logout user 
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut(() => {
    res.redirect("/login")
  })
})

// Post route to send mail for forget password
router.post("/sendMail", (req, res, next) => {

 
})


module.exports = router;