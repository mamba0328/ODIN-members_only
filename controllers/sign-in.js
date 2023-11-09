const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

const User = require('../models/user')
const passport = require("../passport/passport");

const signUpPOST = [
    body('email', ).trim().escape(),
    body('password', ).escape(),
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
    })
];

module.exports = signUpPOST;