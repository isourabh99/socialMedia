var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    user:req.user
  });

});
/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'Express',
    user: req.user
  });

});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Express',
    user: req.user
  });

});
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login',
    user: req.user
  });

  //  GET signup page. ("inside login page")
  router.get('/signup', function (req, res, next) {
    res.render('signup', {
      title: 'Sign Up',
      user: req.user
    });

  });


  /* GET forgot page. */
  router.get('/forget', function (req, res, next) {
   try {
     res.render('forget', {
       title: 'Forget Password',
       user: req.user
     });
   } catch (error) {
    res.send(error.message)
   }
  });
});


// Get verifyOTP page
router.get("/verifyOTP/:id",async(req,res,next)=>{
  res.render("verifyOTP",{
    title:"Verify OTP",
    user:req.user,
    id:req.params.id
  })
})

// 

module.exports = router;