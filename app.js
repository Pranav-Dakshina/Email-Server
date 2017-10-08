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
    console.log(err);
});

var port = process.env.PORT || 5000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var content = [];

// var content = [{
//     img: 'me.jpg',
//     from: {
//       name: 'Pranav Dakshinamurthy',
//       email: 'pranav.dakshina@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'sreeni.jpg',
//     from: {
//       name: 'Sreenivasa A. B. Ayyalasomayajula',
//       email: 'shanuayyala@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'me.jpg',
//     from: {
//       name: 'Pranav Dakshinamurthy',
//       email: 'pranav.dakshina@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'sreeni.jpg',
//     from: {
//       name: 'Sreenivasa A. B. Ayyalasomayajula',
//       email: 'shanuayyala@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'me.jpg',
//     from: {
//       name: 'Pranav Dakshinamurthy',
//       email: 'pranav.dakshina@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'sreeni.jpg',
//     from: {
//       name: 'Sreenivasa A. B. Ayyalasomayajula',
//       email: 'shanuayyala@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'me.jpg',
//     from: {
//       name: 'Pranav Dakshinamurthy',
//       email: 'pranav.dakshina@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   },
//   {
//     img: 'sreeni.jpg',
//     from: {
//       name: 'Sreenivasa A. B. Ayyalasomayajula',
//       email: 'shanuayyala@gmail.com'
//     },
//     subj: 'Test Mail',
//     msg: 'Hi Test Mail'
//   }
// ];

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));
app.use(express.static('./src/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var authRouter = require('./src/routes/login')(con, content);

app.use('/auth', authRouter);
// app.use('/Admin', adminRouter);
// app.use('/Auth', authRouter);

app.get('/mail', function(req, res) {
  res.render('mail', {
    title: 'Mail',
    content: content,
    back: 'back3.jpg'
  });
});

app.get('/m-thabpet', function(req, res) {
  res.render('mobile', {
    title: 'Thabpet'
  });
});

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Thabpet'
  });
});
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
