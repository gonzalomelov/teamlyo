var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
	date: {
		type:Date
	},
	comment : {
		type :String,
		required : true
	},
	userId : {
		type : String,
		required : true
	}
});

var SetSchema = new Schema({
	picture: {
		type: String,
		required: true
	},
	title: {
		type: String
	},
	likeCount: {
		type: Number
	},
	userId : {
		type:String,
		required:true
	},
	comments : [CommentSchema],
	items : [String]
});

SetSchema.methods = {

};

SetSchema.statics = {

};

module.exports = mongoose.model('Set', SetSchema);