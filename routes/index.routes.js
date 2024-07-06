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
    res.render('forget', {
      title: 'Forget Password',
      user: req.user
    });

  });
});

module.exports = router;