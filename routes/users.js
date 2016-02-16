var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, email: req.body.email}),
  req.body.password, function(err, user) {
    if (err) { res.send(err); }
    passport.authenticate('local')(req, res, function() {
      console.log(req.user)
      res.send(req.user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  req.session.save(function (err, user) {
    if (err) { res.send(err); }
    console.log(req.user)
    res.send(req.user)
  });
});

module.exports = router;
