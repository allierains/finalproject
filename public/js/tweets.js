
var tweets

$("#button").show(function() {
  console.log('twitterHandle' + $('#twitterHandle').text())
   $.ajax({
        method: 'get',
        url: '/api/twitter/' + $('#twitterHandle').text()
      })
      .done(function(data){
        var arr = [];
        var tweetsContainer = $('#tweetsContainer');
        for (i=0; i<data.length; i++){
        tweets = data
          arr.push(data[i].text)
          // tweetsContainer.append('<li>' + data[i].text + '</li>');
        }
      });
});



      $("#button2").click(function(){
        var naughtyWords = ['shit', 'fuck', 'bitch', 'fucking', 'hoe', 'ass', 'asshole', 'slut', 'whore', 'cunt', 'damn', 'motherfucker']
        var arr = []
        var counter = 0
        for (var j= 0; j<tweets.length; j++){
          arr.push(tweets[j].text)
        }
        console.log(arr)
        for(var i = 0; i<arr.length; i++){
          var currentTweet = arr[i].split(' ');
          console.log(currentTweet)
          for (var k = 0; k < currentTweet.length; k++) {
            console.log(currentTweet[k])
            if(currentTweet[k] == naughtyWords[0] || currentTweet[k] == naughtyWords[1] || currentTweet[k] == naughtyWords[2] || currentTweet[k] == naughtyWords[3] || currentTweet[k] == naughtyWords[4] || currentTweet[k] == naughtyWords[5] || currentTweet[k] == naughtyWords[6] || currentTweet[k] == naughtyWords[7] || currentTweet[k] == naughtyWords[8] || currentTweet[k] == naughtyWords[9] || currentTweet[k] == naughtyWords[10] || currentTweet[k] == naughtyWords[11]   ) {
              counter++;
              console.log(counter)
              }
            }
          }
        $("#tweetCounter").text($('#twitterHandle').text() + ' swore ' + counter + ' times!')
        });














