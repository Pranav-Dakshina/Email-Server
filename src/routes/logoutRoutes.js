var express = require('express');
var logoutRouter = express.Router();

var router = function() {

  logoutRouter.route('/')
    .get(function(req, res) {
      if (req.cookies.thabIn === 'yes') {
        res.cookie('thabIn', 'no');
        res.clearCookie('uid');
        res.redirect('./');
      } else {
        res.redirect('./');
      }
    });

  return logoutRouter;
};

module.exports = router;
