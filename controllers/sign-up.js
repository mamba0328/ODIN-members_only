const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")

const User = require('../models/user')
const passport = require("../passport/passport");

const signUpPOST = [
    body('name', 'Name length, must be in range of 3-33 symbols').trim().isLength({min:3, max:33}).escape(),
    body('surname', 'Surname length, must be in range of 3-33 symbols').trim().isLength({min:3, max:33}).escape(),
    body('email', 'Email should br valid and at lest 6 symb long').trim().isLength({min:6,}).escape(),
    body('password', 'Password should be at least 4 symb long').isLength({min:4}).escape(),
    body('confirmPassword', 'Passwords should match').custom((value, { req }) => {
        return value === req.body.password;
    }),
    asyncHandler(async (req, res, next) => {
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;
        const password = req.body.password;

        const result = validationResult(req);
        const errors = result.errors;

        if(errors.length){
            return res.render('sign-up', {title:'Create item', name, surname, email, password, errors,});
        }

        const userWithSameEmail = await User.findOne({email});
        const userWithSameEmailExist = userWithSameEmail !== null;
        if(userWithSameEmailExist){
            errors.push({msg: 'User with such email already exist'});
            return res.render('sign-up', {title:'Create item', name, surname, email, password, errors,});
        }

        const cryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, surname, email, password: cryptedPassword})
        const saveUser = await newUser.save();
        res.redirect('/home');
    }),
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
    })
];

module.exports = signUpPOST;