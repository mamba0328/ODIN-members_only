var express = require('express');
var router = express.Router();
const { messageDelete, } = require('../controllers/message')

router.get('/delete/:id', messageDelete);

module.exports = router;
