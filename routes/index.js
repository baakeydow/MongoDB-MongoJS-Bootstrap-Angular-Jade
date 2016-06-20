var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'demo.com' });
});

router.get('/links', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/demo';
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    console.log('Connection established to', url);
    var collection = db.collection('usersdata');
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('linkslist',{
          // Pass the returned database documents to Jade
          "linkslist" : result
        });
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  }
  });
});
router.get('/newlink', function(req, res){
    res.render('newlink', {title: 'Add A Link' });
});
router.post('/addnewlink', function(req, res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/demo';
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        var collection = db.collection('usersdata');
        var linked = {linkname: req.body.linkname, linkref: req.body.linkref, linkdesc: req.body.linkdesc};
        collection.insert([linked], function (err, result){
          if (err) {
            console.log(err);
          } else {
            res.redirect("index");
          }
          db.close();
        });
      }
    });
});

router.get('/bookmarks', function(req, res){
    res.render('html/Bookmarks.html', {title: 'Welcome' });
});
router.get('/contact', function(req, res){
    res.render('html/Contact.html', {title: 'Contact' });
});
router.get('/userslinks', function(req, res){
    res.render('html/Userslinks.html', {title: 'Add Links' });
});
router.get('/pdfs_Fleet', function(req, res){
    res.render('html/Pdfs_Fleet.html', {title: 'Add Ressource' });
});
router.get('/auth', function(req, res){
    res.render('auth', {title: 'hey to view this page you need to Authenticate' });
});
router.get('/pdfs*', function(req, res){
    res.render('/', {title: 'Welcome' });
});

module.exports = router;
