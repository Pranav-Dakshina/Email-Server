var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass'
  },
  function(user, pass, done){
    var user = {
       username: user,
       password: pass
    };
    console.log('passport-local');
    done(null, user);
  }));
}
