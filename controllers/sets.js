var Set = require('../models/Set.js');

exports.getSets = function(req, res, next) {
  Set.find({}, function (err, sets) {
    if (err){
      res.status(500);
      return res.json({errors: [err]});
    }
    return res.send(sets);
  });
}

exports.getSet = function(req, res, next) {
  res.render('home', { title: 'sety' });
}

exports.createSet = function(req, res, next) {
  var set = new Set(req.body);
  set.save(function(err, set, numberAffected) {
    if (err) {
      res.status(500);
      return res.json({errors: [err]});
    }
    console.log(set);
    return res.send(result);
  });
}