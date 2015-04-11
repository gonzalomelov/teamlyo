var express = require('express');
var router = express.Router();

var controller = require('controllers/home.js');

/* GET main page. */
router.get('/', controller.getSets);

module.exports = router;
