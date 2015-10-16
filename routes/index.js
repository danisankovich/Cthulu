var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
  res.send();
});

router.get('/user', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) {
      console.error(err);
    }
    else {
      res.json(req.user);
    }
  });
});

router.get('/register', function(req, res) {
  res.send('this');
});

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username, email: req.body.email}),
    req.body.password, function(err, user) {
      if (err) {
        console.error(err);
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/#/');
      });
  });
});

router.get('/login', function(req, res) {
  // res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/ping', function(req, res) {
  res.status(200).send("ping!");
});
module.exports = router;
