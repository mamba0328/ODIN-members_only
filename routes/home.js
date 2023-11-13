var express = require('express');
const {isMember} = require("../middleware/authMiddleware");
var router = express.Router();

/* GET home page. */
router.get('/', isMember, function(req, res, next) {
    res.render('home', {title: 'Home'});
});

module.exports = router;
