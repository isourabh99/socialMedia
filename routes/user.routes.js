var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.schema");

const { isLoggedIn } = require("../middleware/auth");
const { sendMail } = require("../utils/sendMail");
const imagekit =require("../utils/imagekit")

passport.use(new LocalStrategy(userModel.authenticate()));

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, email, mobileNum } = req.body;
    const nonChangableData = {
      username,
      email,
      mobileNum,
    };
    const encryptedData = password;
    const data = await userModel.register(nonChangableData, encryptedData).then(()=>{
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/user/profile");
      })
    });
  } catch (error) {
    console.log(error.message);
  }
});

// login post route for user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/login",
  }),
  (req, res, next) => {}
);

//  GET profile page. ("aftere login")
router.get("/profile", isLoggedIn, function (req, res, next) {
  try {
    res.render("profile", {
      title: "Profile",
      user: req.user,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Get route for logout user
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut(() => {
    res.redirect("/login");
  });
});

// Post route to send mail for forget password
router.post("/sendMail", async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.send(`No user found with this email ${req.body.email}`);
    await sendMail(req, res, user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// post route to verify OTP
router.post("/verifyOTP/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.send("no user found");
    if (user.otp != req.body.otp) {
      user.otp = 0;
      await user.save();
      return res.send(`Invalid OTP`);
    }
    user.otp = 0;
    await user.setPassword(req.body.password);
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// GET route to render settings page
router.get("/settings", isLoggedIn,(req, res, next) => {
  res.render("settings", {
    title: "USER SETTINGS",
    user:req.user
  });
});


// post route to upload image in settings page
router.post("/avatar/:id", isLoggedIn,async (req, res, next) => {
  
   try {
     const { fileId, url, thumbnailUrl } = await imagekit.upload({
       file: req.files.avatar.data,
       fileName: req.files.avatar.name,
     });

     if (req.user.avatar.fileId) {
       await imagekit.deleteFile(req.user.avatar.fileId);
     }
     req.user.avatar = { fileId, url, thumbnailUrl };
     await req.user.save();
     console.log(req.user);
     res.redirect("/user/settings");
   } catch (error) {
     console.log(error);
     res.send(error.message);
   }
});

module.exports = router;
