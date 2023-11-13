const {isAuth} = require("../middleware/authMiddleware");
const asyncHandler = require('express-async-handler');
const { body, validationResult, } = require("express-validator");
const User = require("../models/user");


require('dotenv').config()
const SECRET_ANSWER = process.env.MEMBER_AUTH_ANSWER;

module.exports.get = [isAuth, (req, res, next) => {
    res.render('confirm-membership', {title: 'Confirm membership'})
}]

module.exports.post = [
    isAuth,
    body('answer', 'Answer is required').trim().notEmpty().escape(),
    asyncHandler(async (req, res, next) => {
        const answer = req.body.answer;
        const user = req.user;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return res.render('confirm-membership', {title:'Confirm membership', errors});
        }

        if(answer !== SECRET_ANSWER){
            errors.push({msg: 'Wrong answer'});
            return res.render('confirm-membership', {title:'Confirm membership', errors});
        }

        await User.findByIdAndUpdate(user._id, {is_member: true});
        return  res.redirect('/home');
    })
]