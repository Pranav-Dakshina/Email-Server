var express = require('express');
var indexRouter = express.Router();
var querystring = require('querystring');
var http = require('http');

// var login = [];

var router = function(con, content) {

  indexRouter.route('/')
    .get(function(req, res) {
      // console.log(req.cookies.beenHereBefore);
      // console.log(req.cookies.thabIn);
      // console.log(req.cookies.uid);
      if (req.cookies.beenHereBefore === 'yes') {
        if (req.cookies.thabIn === 'yes') {
          con.query('select uname, pass from login_info where uid = ?;', req.cookies.uid,
            function(error, results) {
              req.session["content"] = results;
              res.redirect('/mail');
            });
        } else {
          res.cookie('thabIn', 'no');
          res.render('index', {
            title: 'Thabpet',
            err_message: ' '
          });
        }
      } else {
        res.cookie('thabIn', 'no');
        res.render('index', {
          title: 'Thabpet',
          err_message: ' '
        });
      }
    });

  return indexRouter;
};

module.exports = router;
