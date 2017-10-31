var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var sql = require('mysql');

var app = express();

var con = sql.createConnection({
  host: '127.0.0.1',
  user: 'Nero',
  password: 'Mysql@2210',
  database: 'thabpet'
});

con.connect(function(err) {
 // if (err.length > 0) {
  // console.log(err);
 // }
});

var port = process.env.PORT || 5000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var content = [];
var err_message = '';

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser('Thabpet'));
app.use(session({
  secret: 'thabpet',
  resave: true,
  saveUninitialized: true
}));

require('./src/config/passport')(app, con);
// require('./src/config/crypt')(enc, dec);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var indexRouter = require('./src/routes/indexRoutes')(con, content);
var authRouter = require('./src/routes/authRoutes')(content);
var errLoginRouter = require('./src/routes/errLoginRoutes')();
var logoutRouter = require('./src/routes/logoutRoutes')();
var mailRouter = require('./src/routes/mailRoutes')(content);


app.use('/auth', authRouter);
app.use('/login', errLoginRouter);
app.use('/logout', logoutRouter);
app.use('/mail', mailRouter);
app.use('/', indexRouter);

app.listen(port, function(err) {
  // console.log('running server on port ' + port);
});
