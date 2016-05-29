
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var path = __dirname + '/views';
var mongojs = require('mongojs');

app.use(express.static(path));
app.use(bodyParser.json());

//
// Links
//

var linksdb = mongojs('linkslist', ['techLinks', 'prgLinks']);
// Get All
app.get('/techLinks', function (req, res) {
  console.log('GET request');
	linksdb.techLinks.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
app.get('/prgLinks', function (req, res) {
  console.log('GET request');
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


//
// Routing
//


app.use("/", router);

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});
router.get("/", function(req, res){
  res.sendFile(path + "/index.html");
});
router.get("/contact", function(req, res){
  res.sendFile(path + "/Contact.html");
});
app.use("/Bookmarks", function(req, res){
  res.sendFile(path + "/Bookmarks.html");
});
app.use("/links", function(req, res){
  res.sendFile(path + "/Links.html");
});
app.use("*", function(req, res){
  res.sendFile(path + "/404.html");
});


app.listen(8000);
console.log("Server running on port 8000");
