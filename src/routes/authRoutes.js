var express = require('express');
var authRouter = express.Router();
var sql = require('mysql');
var passport = require('passport');
var IMAPserver = require('imap'),
  inspect = require('util').inspect;
const MailParser = require('mailparser').MailParser;

var uid = 0;

var cnt = 0;

var content = [];

var router = function(con, content) {

  authRouter.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/login?err=1'
  }), function(req, res) {
      // console.log('req.user: ' + req.user );
    var imap = new IMAPserver({
      user: req.body.user,
      password: req.body.pass,
      host: 'thabpet.com',
      port: 993,
      tls: true
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
      openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch('1:' + box.messages.total, {
          // bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          bodies: '',
          struct: true
        });
        f.on('message', function(msg, seqno) {
          // console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            var mp = new MailParser();
            mp.on('headers', function(mail) {
              var mailmsg = {};

              var to = {};
              to["address"] = mail.get('to').value[0].address;
              to["name"] = mail.get('to').value[0].name;

              mailmsg["to"] = to;

              var from = {};
              from["address"] = mail.get('from').value[0].address;
              from["name"] = mail.get('from').value[0].name;

              mailmsg["from"] = from;

              if (mail.has('subject')) {
                mailmsg["subject"] = mail.get('subject');
              } else {
                mailmsg["subject"] = "No Subject";
              }

              content.push(mailmsg);

            });

            mp.on('data', function(mail) {
              content[cnt]["Text"] = mail.textAsHtml;
              cnt++;
            });

            stream.pipe(mp);

          });

          msg.once('attributes', function(attrs) {
            // attrs here is an *object* containing email metadata
          });

          msg.on('end', function() {
            // console.log('Done fetching all messages');
            imap.end();
          });

        });

        f.once('error', function(err) {
          // console.log('Fetch error: ' + err);
        });

        f.once('end', function() {
          // console.log('Done fetching all messages!');
          imap.end();
        });

      });
     });

      imap.once('error', function(err) {
        // console.log(err);
      });

      imap.once('end', function() {
        // console.log('Cction ended');
        req.login(content, function() {
          res.redirect('/mail');
        });
      });

      imap.connect();

  });

  authRouter.route('/signUp')
    .post(function(req, res) {
      req.login(req.body, function() {
        res.redirect('/mail');
      });
    });

  return authRouter;
};

module.exports = router;
