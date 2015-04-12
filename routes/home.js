var express = require('express');
var router = express.Router();

var setsController = require('../controllers/sets.js');

/* GET main page. */
router.get('/', setsController.getSets);

module.exports = router;