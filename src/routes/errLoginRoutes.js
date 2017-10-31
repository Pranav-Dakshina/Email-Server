var express = require('express');
var errLoginRouter = express.Router();
const {
  URL,
  URLSearchParams
} = require('url');

var router = function() {

  errLoginRouter.route('/')
    .get(function(req, res) {
      var urlParams = new URLSearchParams(req._parsedOriginalUrl.search);
      req.session["err_message"] = urlParams.get('err');
      res.redirect('/');
      // res.render('index', {
      //   title: 'Thabpet',
      //   err_message: err_message
      // });
    });

  return errLoginRouter;
};

module.exports = router;
