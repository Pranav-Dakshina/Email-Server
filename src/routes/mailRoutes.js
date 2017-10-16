var express = require('express');
var mailRouter = express.Router();

var IMAPserver = require('imap');
const MailParser = require('mailparser').MailParser;

var content = [];

var cnt = 0;

var router = function(login) {

  mailRouter.route('/')
    .get(function(req, res) {
      // console.log(req.session.content[0]);
      if (req.session.content) {

        var imap = new IMAPserver({
          user: req.session.content[0].uname,
          password: req.session.content[0].pass,
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
            // imap.sort(['DATE'], ['ALL'], function(err, sortResults) {
            // if (err) throw err;
            // var f = imap.fetch(sortResults, {
            var f = imap.seq.fetch(box.messages.total + ':1', {
              // bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
              bodies: '',
              struct: true
            });
            f.on('message', function(msg, seqno) {
              // console.log('Message #%d', seqno);
              var prefix = '(#' + seqno + ') ';
              msg.on('body', function(stream, info) {
                var mp = new MailParser();
                // console.log(mp);
                mp.on('data', data => {
                  // if (data.type === 'text') {

                  if (cnt == 0) {
                    content[cnt]["Text"] = data.textAsHtml;
                    cnt = cnt + 2;
                  } else {
                    if (cnt == box.messages.total) {
                      content[1]["Text"] = data.textAsHtml;
                      imap.end();
                    } else {
                      content[cnt]["Text"] = data.textAsHtml;
                      cnt++;
                    }

                  }
                  // console.log(content);
                  //   console.log(data.textAsHtml);
                  // }
                });

                mp.on('headers', function(mail) {
                  // console.log(mail);
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

                stream.pipe(mp);
              });

              msg.once('attributes', function(attrs) {
                // attrs here is an *object* containing email metadata
              });

              msg.on('end', function() {
                // console.log('Done fetching all messages');
                // imap.end();
              });

            });

            f.once('error', function(err) {
              // console.log('Fetch error: ' + err);
            });

            f.once('end', function() {
              // console.log('Done fetching all messages!');
              //  imap.end();
            });

            // });
          });
        });

        imap.once('error', function(err) {
          // console.log(err);
        });

        imap.once('end', function() {
          // console.log('Cction ended');
          req.login(content, function() {
            // console.log(content);
            res.render('mail', {
              title: 'Mail',
              content: content,
              back: 'back3.jpg'
            });
          });
        });

        imap.connect();

      } else {
        res.redirect('back');
      }

    });

  return mailRouter;
};

module.exports = router;
