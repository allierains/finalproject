var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth-with-passport', function (err) {
  if (err) {
    return console.log('Cannot connect to database', err);
  }
  return console.log('Database connected.');
});

module.exports = mongoose;
