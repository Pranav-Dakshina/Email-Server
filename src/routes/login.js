var express = require('express');
var authRouter = express.Router();
var sql = require('mysql');
var IMAPserver = require('imap'),
  inspect = require('util').inspect;
const MailParser = require('mailparser').MailParser;


var uid = 0;

var cnt = 0;

var content = [];

var router = function(con, content) {

  authRouter.post('/signIn', function(req, res) {
    console.log("Hi");
    console.log(req.body);
    con.query('select uid from login_info where uname = ? and pass = ?', [req.body.user, req.body.pass],
      function(err, rec) {
        console.log(rec);
        // uid = rec[0].uid;
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
              console.log('Message #%d', seqno);
              var prefix = '(#' + seqno + ') ';
              msg.on('body', function(stream, info) {
                //     var buffer = '';
                //     stream.on('data', function(chunk) {
                //       buffer += chunk.toString('utf8');
                //     });
                //     stream.once('end', function() {
                //       console.log(prefix + 'Parsed header: %s', inspect(IMAPserver.parseHeader(buffer)));
                //       console.log('Cnt : ' + cnt);
                //
                //       simpleParser(buffer, (err, mail) => {
                //         if (mail.headers.has('to').value) {
                //           msg[cnt].to = mail.headers.get('to').value;
                //           console.log(msg[cnt].to);
                //         };
                //         if (mail.headers.has('from').value) {
                //           msg[cnt].from = mail.headers.get('from').value;
                //           console.log(msg[cnt].from);
                //         }
                //       });
                //
                //       cnt++;
                //     });
                //   });
                //   msg.once('attributes', function(attrs) {
                //     console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                //   });
                //   msg.once('end', function() {
                //     console.log(prefix + 'Finished');
                //   });
                // });
                //
                // f.once('error', function(err) {
                //   console.log('Fetch error: ' + err);
                // });
                // f.once('end', function() {
                //   console.log('Done fetching all messages!');
                //   imap.end();
                // });
                var mp = new MailParser();
                mp.on('headers', function(mail) {
                  // console.log('Headers : ');
                  // console.log(mail.get('to').value[0].address);
                  // console.log(mail.get('from').value[0].address);

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

                  // console.log(content);

                });

                mp.on('data', function(mail) {
                  // console.log('body : ');
                  // console.log(mail.textAsHtml);
                  content[cnt]["Text"] = mail.textAsHtml;
                  cnt++;
                  // console.log(content);
                });

                stream.pipe(mp);

              });
              msg.once('attributes', function(attrs) {
                // attrs here is an *object* containing email metadata
              });

              msg.on('end', function() {
                console.log('Done fetching all messages');
                imap.end();
              });

            });
          });
        });

        imap.once('error', function(err) {
          console.log(err);
        });

        imap.once('end', function() {
          console.log('Cction ended');
          req.login(content, function() {
            res.redirect('/mail');
          });
        });

        imap.connect();



      });

  });

  authRouter.route('/signUp')
    .post(function(req, res) {
      //  console.log('signUp');
      req.login(req.body, function() {
        res.redirect('/mail');
      });
    });

  // authRouter.route('/mail')
  //     .get(function (req, res) {
  //       res.render('mail', {
  //           title: 'Mail',
  //           msg: msg,
  //           back: 'back3.jpg'
  //         });
  //     });

  return authRouter;
};

module.exports = router;
