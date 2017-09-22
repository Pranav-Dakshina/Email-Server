var express = require('express');
// var bodyParser = require('body-parser');
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

// var nav = [{
//     Link: '/Books',
//     Text: 'Books'
// }, {
//     Link: '/Authors',
//     Text: 'Authors'
// }];

// var authRouter = require('./src/routes/authRoutes')(nav, con);

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cookieParser());
// app.use(session({secret: 'library'}));
//
// require('./src/config/passport')(app);

app.set('views','./src/views');
app.set('view engine', 'ejs');

// app.use('/Books', bookRouter);
// app.use('/Admin', adminRouter);
// app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index',  {
        title: 'Thabpet'
    });
});
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
