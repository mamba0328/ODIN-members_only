var express = require('express');
var router = express.Router();

const {isAuth} = require('../middleware/authMiddleware');
/* GET home page. */
router.get('/', isAuth,
    function(req, res) {
      return res.redirect('/home');
    },
);

module.exports = router;
