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
  console.log(err);
 // }
});

var port = process.env.PORT || 5000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var content = [];
var err_message = '';

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser('Thabpet'));
app.use(session({
  secret: 'library'
}));

require('./src/config/passport')(app, con);
// require('./src/config/crypt')(enc, dec);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var authRouter = require('./src/routes/authRoutes')(con, content);
var errLoginRouter = require('./src/routes/errLoginRoutes')();

app.use('/auth', authRouter);
app.use('/login', errLoginRouter);

app.route('/mail')
  // .all(function(req, res, next) {
  //   if (!req.user) {
  //     res.status(301).redirect('/');
  //   }
  //   next();
  // })
  .get(function(req, res) {
    // console.log(req);
    if (content.length > 0) {
      res.render('mail', {
        title: 'Mail',
        content: content,
        back: 'back3.jpg'
      });
    } else {
      res.redirect('/');
    }
  });
//
// app.get('/m-thabpet', function(req, res) {
//   res.render('mobile', {
//     title: 'Thabpet'
//   });
// });

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Thabpet',
    err_message: ' '
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
