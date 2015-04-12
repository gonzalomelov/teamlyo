var Set = require('../models/Set.js');

exports.getSets = function(req, res, next) {
  Set.find({}, function (err, sets) {
    if (err){
      res.status(500);
      return res.json({errors: [err]});
    }
    return res.send(sets);
  }).sort({likeCount: -1});
}

exports.getSet = function(req, res, next) {

  console.log('get stat')
  Set.findById(req.params.id, function (err, sets) {
    if (err){
      res.status(400);
      return res.json({errors: [err]});
    }
    return res.send(sets);
  });

}

exports.createSet = function(req, res, next) {
  var set = new Set(req.body);
  set.save(function(err, set, numberAffected) {
    if (err) {
      res.status(400);
      return res.json({errors: [err]});
    }
    console.log(set);
    return res.send(set);
  });
}