var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

const {get, post} = require('../controllers/message')

const {isMember} = require("../middleware/authMiddleware");

/* GET home page. */
router.get('/', get);
router.post('/', post);

module.exports = router;
