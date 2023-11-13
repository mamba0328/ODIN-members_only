var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');


const Message = require('../models/message')

const {isAuth} = require("../middleware/authMiddleware");
const {all} = require("express/lib/application");

/* GET home page. */
router.get('/',
    isAuth,
    asyncHandler( async (req, res, next) => {
        const allMessages = await Message.find().populate('user');

        res.render('home',  {title: 'Home', messages: allMessages.reverse()});
    }),
);

module.exports = router;
