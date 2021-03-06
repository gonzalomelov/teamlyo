var express = require('express');
var router = express.Router();

var controller = require('../controllers/sets.js');

/* GET main page. */
router.get('/', controller.getSets);
router.get('/:id', controller.getSet);
router.post('/', controller.createSet);
router.get('/:id/picture', controller.getSetPicture);

module.exports = router;
