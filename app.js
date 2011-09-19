var RegExp, app, express, haml, m;
m = require('mongoose');
m.connect('mongodb://localhost/jjex');
express = require('express');
haml = require('hamljs');
RegExp = m.model('RegExp', new m.Schema({
  pattern: String,
  test_string: String,
  email: String,
  title: String
}));
app = express.createServer();
app.register('.haml', haml);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  var assertion, re, regexps, str, test;
  re = /\((\d{0,3})\)/i;
  str = "(0) produkter";
  assertion = "0";
  test = str.match(re);
  return (regexps = RegExp.find({}, function(err, docs) {
    return err ? res.json({
      message: 'errorz'
    }) : res.render('index.haml', {
      docs: docs
    });
  }));
});
app.post('/regexps', function(req, res) {
  var error, regexp;
  regexp = new RegExp({
    pattern: req.body.pattern,
    test_string: req.body.test_string,
    title: req.body.title
  });
  error = false;
  return regexp.save(function(err) {
    return err ? res.json({
      message: 'errorz'
    }) : res.json(regexp);
  });
});
app.get('/regexps/:id', function(req, res) {
  var regexp;
  return (regexp = RegExp.findById(req.params.id, function(err, docs) {
    return err ? res.json({
      message: 'errorz'
    }) : res.json(docs);
  }));
  app = express.createServer();
  app.register('.haml', haml);
  app.use(express.bodyParser());
  app.get('/', function(req, res) {
    var assertion, re, str, test;
    re = /\((\d{0,3})\)/i;
    str = "(0) produkter";
    assertion = "0";
    test = str.match(re);
    return res.render('index.haml');
  });
  app.post('/regexps', function(req, res) {
    var regexp;
    regexp = new RegExp({
      pattern: req.body.pattern,
      test_string: req.body.test_string
    });
    return res.redirect("/regexps/" + regexp.id);
  });
  app.get('/regexps/:id', function(req, res) {
    var regexp;
    return regexp = RegExp.findById(req.params.id, function(err, docs) {
      if (err) {
        return res.json({
          message: 'errorz'
        });
      } else {
        return res.json(docs);
      }
    });
  });
  app.listen(3002);
}).call(this);
