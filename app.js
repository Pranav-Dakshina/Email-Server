var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var session = require('express-session');
// var sql = require('mysql');

var app = express();

// var con = sql.createConnection({
//     host: '127.0.0.1',
//     user: 'Nero',
//     password: 'Mysql@2210',
//     database: 'test'
// });
//
// con.connect(function(err) {
//     console.log(err);
// });

var port = process.env.PORT || 5000;

var content = [{
    img: 'me.jpg',
    from: {
      name: 'Pranav Dakshinamurthy',
      email: 'pranav.dakshina@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'sreeni.jpg',
    from: {
      name: 'Sreenivasa A. B. Ayyalasomayajula',
      email: 'shanuayyala@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'me.jpg',
    from: {
      name: 'Pranav Dakshinamurthy',
      email: 'pranav.dakshina@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'sreeni.jpg',
    from: {
      name: 'Sreenivasa A. B. Ayyalasomayajula',
      email: 'shanuayyala@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'me.jpg',
    from: {
      name: 'Pranav Dakshinamurthy',
      email: 'pranav.dakshina@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'sreeni.jpg',
    from: {
      name: 'Sreenivasa A. B. Ayyalasomayajula',
      email: 'shanuayyala@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'me.jpg',
    from: {
      name: 'Pranav Dakshinamurthy',
      email: 'pranav.dakshina@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  },
  {
    img: 'sreeni.jpg',
    from: {
      name: 'Sreenivasa A. B. Ayyalasomayajula',
      email: 'shanuayyala@gmail.com'
    },
    subj: 'Test Mail',
    msg: 'Hi Test Mail'
  }
];

var authRouter = require('./src/routes/login');

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(cookieParser());
// app.use(session({secret: 'library'}));
//
// require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/auth', authRouter);
// app.use('/Admin', adminRouter);
// app.use('/Auth', authRouter);
// app.post('/auth/login', function(req, res) {
// console.log(req.body);
// // console.log(res);
// });
// app.get('/mail/', function(req, res) {
//     res.redirect('/mail');
// });

app.get('/login', function(req, res) {
  res.render('slogin', {
    title: 'LogIn',
    content: content
  });
});

app.get('/mail', function(req, res) {
  res.render('mail', {
    title: 'Mail',
    content: content,
    back: 'back3.jpg'
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