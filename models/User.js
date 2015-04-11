var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id : {
		type: String,
		required: true
	},
	facebookId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String
	},
	lastLogin: {
		type: Date,
	}
});

UserSchema.methods = {

	validatePassword: function(password, cb) {
		bcrypt.compare(password, this.password, function(err, isMatch) {
			cb(err, isMatch);
		});
	},
	hashPassword : function(){
		var salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}
};

UserSchema.statics = {

};

module.exports = mongoose.model('User', UserSchema);