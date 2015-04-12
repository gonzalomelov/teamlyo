var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var ItemSchema = new Schema({
//	idMercadolibre : {
//		type:String,
//		required : true
//	},
//	title : {
//		type:String,
//		required : true
//	},
//	url : {
//		type:String,
//		required: true
//	},
//	price : {
//		type: Number,
//		required : true
//	},
//	currency : {
//		type:String
//	},
//	imageUrl : {
//		type:String
//	}
//
//});

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