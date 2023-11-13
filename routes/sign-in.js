var express = require('express');
var router = express.Router();

const passport = require('../passport/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sign-in', {title: 'Sign-in'});
});

router.post('/',  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/sign-in"
}));


module.exports = router;
