var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var mongo = require('mongodb');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


//
// Links
//


var linksdb = mongojs('linkslist', ['techLinks', 'prgLinks']);
// Get All
app.get('/techLinks', function (req, res) {
  console.log('I received a GET request');
	linksdb.techLinks.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
app.get('/prgLinks', function (req, res) {
  console.log('I received a GET request');
	linksdb.prgLinks.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
// Post
app.post('/techLinks', function (req, res) {
  console.log(req.body);
	linksdb.techLinks.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});
app.post('/prgLinks', function (req, res) {
  console.log(req.body);
	linksdb.prgLinks.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});
// Delete
app.delete('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb.techLinks.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.delete('/prgLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb.prgLinks.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
// Get one
app.get('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb.techLinks.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.get('/prgLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb.prgLinks.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
// Update
app.put('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  linksdb.techLinks.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, desc: req.body.desc}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
);
});
app.put('/prgLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  linksdb.prgLinks.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, desc: req.body.desc}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
);
});

//
// Contact
//

var contactdb = mongojs('contactlist', ['contactlist']);

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
  contactdb.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  contactdb.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  contactdb.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  contactdb.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  contactdb.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
