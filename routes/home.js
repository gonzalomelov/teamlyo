var express = require('express');
var request = require('request').defaults({ encoding: null });

var router = express.Router();

var setsController = require('../controllers/sets.js');

/* GET main page. */
router.get('/', setsController.getSets);

router.get('/image',function(req,res){

	var url = req.query.url;

	request.get(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			res.json({data:data});
		}else{
			console.log(error);
		}
	});


});
module.exports = router;
