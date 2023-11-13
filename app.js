var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require("express-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');

var signInRouter = require('./routes/sign-in');
var signUpRouter = require('./routes/sign-up');
var logOutRouter = require('./routes/log-out');
var confirmMembershipRouter = require('./routes/confirm-membership');

const passport = require('./passport/passport')

const { connectToMongoDB } = require('./database/mongoDB');
const setCurrentUser = require('./middleware/setCurrentUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//PASSPORT SETUP
app.use(connectToMongoDB)
app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 //day = hours * minutes * seconds * milliseconds
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user ?? 'no user');
  next();
})

app.use(express.urlencoded({ extended: true }));

app.use(setCurrentUser);

// ROUTES
app.use('/confirm-membership', confirmMembershipRouter)
app.use('/sign-in', signInRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-out', logOutRouter); // Corrected the path here
app.use('/home', homeRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
