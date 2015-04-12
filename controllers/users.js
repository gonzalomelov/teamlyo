var User = require('../models/User.js');

exports.loginUser = function(req, res, next) {
  console.log("Exist user function");
  
  User.findOne({facebookId: req.facebookId}, function(err, user) {
    if(!err) {
        if(!user) {
            user = new User();
            user.facebookId = req.facebookId;
        }
        user.name = request.name;
        user.save(function(err) {
            if(!err) {
                res.send(user);
                console.log("user " + user.facebookId + " created at " + user.createdAt + " updated at " + user.updatedAt);
            }
            else {
                res.ren(500);
                console.log("Error: could not save contact " + user.facebookId);
            }
        });
    }
});
}
