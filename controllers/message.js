const {isMember, isAdmin} = require("../middleware/authMiddleware");
const asyncHandler = require('express-async-handler');
const { body, validationResult, } = require("express-validator");

const User = require("../models/user");
const Message = require('../models/message')

const getNowDate = () => {
    const now = new Date;

    return [now.getMonth()+1, now.getDate(), now.getFullYear()].join('/') + ' ' + [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
}

module.exports.get = [
    isMember,
    asyncHandler( async (req, res, next) => {
        res.render('create-message',  {title: 'Create message'});
    })
]

module.exports.post = [
    isMember,
    body('messageTitle', 'Title is required').trim().notEmpty().isLength({max: 500}).escape(),
    body('messageContent', 'Content is required').trim().notEmpty().isLength({max: 500}).escape(),

    asyncHandler(async (req, res, next) => {
        const messageTitle = req.body.messageTitle;
        const messageContent = req.body.messageContent;
        const user = req.user;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return res.render('create-message', {title:'Create message', messageTitle, messageContent, errors});
        }

        const message = {
            title: messageTitle,
            content: messageContent,
            user: user._id,
            created_at: getNowDate(),
        }

        const newMessage = await Message.create(message);

        return res.redirect('/home');
    })
]

module.exports.messageDelete = [
    isAdmin,
    asyncHandler( async (req, res, next) => {
        const id = req.params.id;
        await Message.findByIdAndDelete(id);
        res.redirect('/home');
    })
]

