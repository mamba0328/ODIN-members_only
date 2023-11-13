var express = require('express');
var router = express.Router();
const {get, post} = require('../controllers/confirm-membership');

router.get('/', get);

router.post('/', post);

module.exports = router;
