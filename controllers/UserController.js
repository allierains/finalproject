var User = require('./models/user.js');

Twitter.prototype.getUserTimeline = function(params, callback) {
  var url = '/statuses/user_timeline.json';
  this.get(url, params, callback);
  return this;
}


module.exports = controller;
