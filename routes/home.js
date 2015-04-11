var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'teamlyo' });
});

module.exports = router;
