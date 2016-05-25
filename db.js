var mongoose = require('mongoose');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-with-passport'
mongoose.connect(mongoURI, function (err) {
  if (err) {
    return console.log('Cannot connect to database', err);
  }
  return console.log('Database connected.');
});

module.exports = mongoose;
