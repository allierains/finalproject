var User = require('./models/user.js');

    var data = {
      indexHeader: "Our Index Page",
      indexParagraph: "Paragraph stuff."
    }
    res.render('index')
  },

  analyses: function(req, res){
    res.render('analyses')
  },


module.exports = controller;
