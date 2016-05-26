
// click event for tweets

$("#button").click(function() {
  console.log('twitterHandle' + $('#twitterHandle').text())
   $.ajax({
        method: 'get',
        url: '/api/twitter/' + $('#twitterHandle').text()
      })
      .done(function(data){
        tweets = data
        var arr = [];
        var tweetsContainer = $('#tweetsContainer');
        for (i=0; i<data.length; i++){
          arr.push(data[i].text)
          tweetsContainer.append('<li>' + data[i].text + '</li>');
        }
      });
});

      $("#button2").click(function(){
        var tweets = tweets[i].text
        var naughtyWords = ['how', 'the', 'a']
        var counter = 0
        for(var i = 0; i<tweets.length; i++){
          var currentTweet = tweets[i].text.split('');
          for (var k = 0; k < currentTweet.length; k++) {
            if(naughtyWords.includes(currentTweet[k])) counter++;
          }
        }
      });













