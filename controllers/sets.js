exports.getSets = function(req, res, next) {
  Set.find({}, function (err, sets) {
    if (err){
      res.status(500);
      return res.json(err);
    }
    res.render('home', { title: 'teamlyo', sets: sets });
  });
}

exports.getSet = function(req, res, next) {
  res.render('home', { title: 'teamlyo' });
}

exports.createSet = function(req, res, next) {
  res.render('home', { title: 'teamlyo' });
}