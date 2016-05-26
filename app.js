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
var OAuth2       = require('oauth').OAuth2;
var passport     = require('passport');
var Strategy     = require('passport-twitter').Strategy;
var api          = express.Router();
var https        = require('https');



// Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET', name: 'id', cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

var oauth2 = new OAuth2(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET, 'https://api.twitter.com/', null, 'oauth2/token', null);

// Define routes


app.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template

        });
  });



app.get('/profile/results', isLoggedIn, function(req, res){
  res.render('results.ejs', {
    user : req.user
  });
})

app.get('/api/twitter/:id', function(req, res){
  oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
  }, function(err, access_token){
    if(err) throw err
    console.log(access_token); //string that we can use to authenticate request
    var options = {
      hostname: 'api.twitter.com',
      path: '/1.1/statuses/user_timeline.json?screen_name=' + req.params.id + '&count=200',
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    };
    https.get(options, function(result){
      var buffer = '';
      result.setEncoding('utf8');
      result.on('data', function(data){
        buffer += data;
      });
      result.on('end', function(){
        var tweets = JSON.parse(buffer);
        console.log(tweets);
        res.json(tweets)
      });
    });
  });

})

// app.post('/api/twitter/:id', function(req, res){
//   oauth2.getOAuthAccessToken('', {
//     'grant_type': 'client_credentials'
//   }, function(err, access_token){
//     if(err) throw err
//     console.log(access_token); //string that we can use to authenticate request
//     var options = {
//       hostname: 'api.twitter.com',
//       path: 'https://api.twitter.com/1.1/statuses/update.json' + req.params.id + '&count=200',
//       headers: {
//         Authorization: 'Bearer ' + access_token
//       }
//     };


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
