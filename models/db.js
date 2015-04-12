var mongoose = require('mongoose');

console.log(process.env.NODE_ENV);

var config = require('../env.json')[process.env.NODE_ENV || 'development'];

exports.loadMongoModels = function() {

	/****** MONGO DB CONNECTION ******/
	var connect = function() {
		console.log("Connecting to database");
		mongoose.connect(config['MONGO_URI']);
	};
	connect();

	// Error handler
	mongoose.connection.on('error', function(err) {
		console.log(err);
	});

	// Reconnect when closed
	mongoose.connection.on('disconnected', function() {
		connect();
	});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});

	require("./User.js");
	require("./Set.js");
};