var mongoose = require('mongoose');

exports.loadMongoModels = function() {

	/****** MONGO DB CONNECTION ******/
	var connect = function() {
		console.log("Connecting to database");
		mongoose.connect('mongodb://localhost:27017/sety');
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