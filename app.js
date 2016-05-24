var express      = require('express');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var path         = require('path');
var db           = require('./db.js');
var port         = process.env.PORT || 3000;
var app          = express();
var routes       = require('./routes.js');
var passport     = require('passport');
var Strategy     = require('passport-twitter').Strategy;
var api          = express.Router();



// Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET', name: 'id', cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());



// Define routes


app.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template

        });
  });


app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



app.get('/login',
  function(req, res){
    res.render('login');
  });



passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });



app.listen(port, function(){
  console.log('Listening on pork: ', port);
});
