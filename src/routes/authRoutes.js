var express = require('express');
var authRouter = express.Router();
var sql = require('mysql');
var passport = require('passport');


var router = function(login) {

  authRouter.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/login?err=1'
  }), function(req, res) {
      // console.log('inside auth/signIn');
      res.cookie('thabIn', 'yes');
      res.cookie('uid', req.user[0].uid);
      login = req.body;
      req.login(login, function() {
        res.redirect('/mail');
      });
  });

  authRouter.route('/signUp')
    .post(function(req, res) {
      // console.log(req.body);
      // req.login(req.body, function() {
      //   res.redirect('/mail');
      // });
    });

  return authRouter;
};

module.exports = router;
