var express      = require('express');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var db           = require('./db.js');
var port         = process.env.PORT || 3000;
var app          = express();
var routes       = require('./routes.js')
var passport     = require('./config/passport.js');
var LocalStrategy = require('passport-local');

// Configure view engine to render EJS templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Define routes
app.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

app.get('/auth/twitter', function(req, res){
  res.render('login')
});

app.listen(port, function() {
  console.log('Listening on pork: ', port);
});
