var Set = require('../models/Set.js');

exports.getSets = function(req, res, next) {
  console.log("a");
  Set.find({}, function (err, sets) {
    if (err){
      // res.status(500);
      console.log('error');
      res.render('home', { title: 'teamlyo' });
    }
    console.log('home');
    res.render('home', { title: 'teamlyo' });
  });
}

exports.getSet = function(req, res, next) {
  res.render('home', { title: 'teamlyo' });
}

exports.createSet = function(req, res, next) {
  res.render('home', { title: 'teamlyo' });
}