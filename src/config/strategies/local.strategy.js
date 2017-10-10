var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  sql = require('mysql');

module.exports = function(con) {
  passport.use(new LocalStrategy({
      usernameField: 'user',
      passwordField: 'pass'
    },
    function(username, password, done) {
      con.query('select uid from login_info where uname = ? and pass = ?;', [username, password],
        function(error, results) {
           if(results.length > 0) {
            var user = results;
            // user["enc"] = require('../crypt')(null, results[0].uid.toString());
            done(null, user);
          } else {
            done(null, false, {message: 'incorrect login'});
          }
        });
    }));
}
