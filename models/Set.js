var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	id : {
		type:String,
		required : true
	},
	idMercadolibre : {
		type:String,
		required : true
	},
	title : {
		type:String,
		required : true
	},
	url : {
		type:String,
		required: true
	},
	price : {
		type: Number,
		required : true
	},
	currency : {
		type:String
	},
	imageUrl : {
		type:String,
	}

});

var CommentSchema = new Schema ({
	date: {
		type:Date,
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
	id: {
		type: String,
		required: true
	},
	pictureUrl: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	likeCount: {
		type: Number,
	},
	userId : {
		type:String,
		required:true
	},
	comments : [CommentSchema],
	items : [ItemSchema]
});

SetSchema.methods = {

};

SetSchema.statics = {

};

module.exports = mongoose.model('Set', SetSchema);