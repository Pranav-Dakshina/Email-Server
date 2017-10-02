var express = require('express');
var authRouter = express.Router();
var IMAPserver = require('imap'),
  inspect = require('util').inspect;

  authRouter.post('/login', function(req, res) {
      console.log("Hi");
      console.log(req.body);
      var imap = new IMAPserver({
        user: req.body.user,
        password: req.body.pass,
        host: 'thabpet.com',
        port: 993
      });

      function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
      }

      imap.once('ready', function() {
        openInbox(function(err, box) {
          if (err) throw err;
          var f = imap.seq.fetch('1:2', {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true
          });
          f.on('message', function(msg, seqno) {
            console.log('Message #%d', seqno);
            var prefix = '(#' + seqno + ') ';
            msg.on('body', function(stream, info) {
              var buffer = '';
              stream.on('data', function(chunk) {
                buffer += chunk.toString('utf8');
              });
              stream.once('end', function() {
                console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
              });
            });
            msg.once('attributes', function(attrs) {
              console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            });
            msg.once('end', function() {
              console.log(prefix + 'Finished');
            });
          });
          f.once('error', function(err) {
            console.log('Fetch error: ' + err);
          });
          f.once('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
      });

      imap.once('error', function(err) {
        console.log(err);
      });

      imap.once('end', function() {
        console.log('Cction ended');
      });

      imap.connect();

    });

module.exports = authRouter;
