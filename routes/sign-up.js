var express = require('express');
var router = express.Router();

const signUpPost = require('../controllers/sign-up')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sign-up', {title: 'Sign-up'});
});

router.post('/', signUpPost);

module.exports = router;
