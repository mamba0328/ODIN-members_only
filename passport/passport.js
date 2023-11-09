const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');

//https://stackoverflow.com/questions/34511021/passport-js-missing-credentials
//passportjs is looking for username
passport.use(new LocalStrategy({
        usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    },
    async function(username, password, done) { // depending on your strategy, you might not need this function ...
        try {

            const user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: "Incorrect email" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        };
    }
));


passport.serializeUser((user, done) => {
    console.log('Serialize user called.');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserialize user called.');
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    };
});

module.exports = passport;