var express = require('express');
var router = express.Router();

var controller = require('../controllers/sets.js');

/* GET main page. */
router.get('/', controller.getSets);

module.exports = router;
