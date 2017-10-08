var express = require('express');
var authRouter = express.Router();
var sql = require('mysql');
var IMAPserver = require('imap'),
  inspect = require('util').inspect;

var uid = 0;

var cnt = 0;

var msg = [{
  to: ['"pranav@thabpet.com" <pranav@thabpet.com>'],
  from: ['Pranav Dakshinamurthy <pranav.dakshina@gmail.com>'],
  subject: ['Hi Pranav'],
  date: ['Fri, 22 Sep 2017 00:55:52 -0500']
}];

var router = function(con, msg) {

  authRouter.post('/login', function(req, res) {
    console.log("Hi");
    console.log(req.body);
    con.query('select uid from login_info where uname = ? and pass = ?', [req.body.user, req.body.pass],
      function(err, rec) {
        console.log(rec);
        uid = rec[0].uid;
      //   var imap = new IMAPserver({
      //     user: req.body.user,
      //     password: req.body.pass,
      //     host: 'thabpet.com',
      //     port: 993,
      //     tls: true
      //   });
      //
      //   function openInbox(cb) {
      //     imap.openBox('INBOX', true, cb);
      //   }
      //
      //   imap.once('ready', function() {
      //     openInbox(function(err, box) {
      //       if (err) throw err;
      //       var f = imap.seq.fetch('1:2', {
      //         bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      //         struct: true
      //       });
      //       f.on('message', function(msg, seqno) {
      //         console.log('Message #%d', seqno);
      //         var prefix = '(#' + seqno + ') ';
      //         msg.on('body', function(stream, info) {
      //           var buffer = '';
      //           stream.on('data', function(chunk) {
      //             buffer += chunk.toString('utf8');
      //           });
      //           stream.once('end', function() {
      //             //console.log(prefix + 'Parsed header: %s', inspect(IMAPserver.parseHeader(buffer)));
      //             msg[cnt] = inspect(IMAPserver.parseHeader(buffer));
      //             console.log(msg[cnt]);
      //             cnt++;
      //           });
      //         });
      //         msg.once('attributes', function(attrs) {
      //           //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      //         });
      //         msg.once('end', function() {
      //           //console.log(prefix + 'Finished');
      //         });
      //       });
      //       f.once('error', function(err) {
      //         console.log('Fetch error: ' + err);
      //       });
      //       f.once('end', function() {
      //         console.log('Done fetching all messages!');
      //         imap.end();
      //       });
      //
      //     });
      //   });
      //
      //   imap.once('error', function(err) {
      //     console.log(err);
      //   });
      //
      //   imap.connect();
      //
      //   imap.once('end', function() {
      //     console.log('Cction ended');
      //     redir();
      //   });
      // });

    });
    // var redir = function() {
      console.log('redirect');
      // res.redirect('http://localhost:5000/mail');
      // res.render('mail', {
      //   title: 'Mail',
      //   msg: msg,
      //   back: 'back3.jpg'
      // });
    // };
    return res.redirect('../mail');;
  });

  return authRouter;
};

module.exports = router;
