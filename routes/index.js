var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
router.get('/', function(req, res, next) {
  res.render('index', { title: '21Times2.com' });
});

router.get('/thelist', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/21times2';
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
        res.render('usersdatalist',{
          // Pass the returned database documents to Jade
          "usersdatalist" : result
        });
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  }
  });
});
router.get('/newuser', function(req, res){
    res.render('newuser', {title: 'Add User' });
});
router.post('/addnewuser', function(req, res){
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/21times2';
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        var collection = db.collection('usersdata');
        var user1 = {user1: req.body.user, email: req.body.email,
          city: req.body.city};
        collection.insert([user1], function (err, result){
          if (err) {
            console.log(err);
          } else {
            res.redirect("thelist");
          }
          db.close();
        });
      }
    });
});

router.get('/bookmarks', function(req, res){
    res.render('bookmarks', {title: 'Welcome' });
});
router.get('/contact', function(req, res){
    res.render('contact', {title: 'Contact' });
});
router.get('/links', function(req, res){
    res.render('links', {title: 'Add Links' });
});
router.get('/pdfs_Fleet', function(req, res){
    res.render('pdfs_Fleet', {title: 'Add Ressource' });
});



module.exports = router;
