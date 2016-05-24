
   $.ajax({
        method: 'get',
        url: "https://api.twitter.com/1.1/statuses/user_timeline.json"

      })
      .done(function(data){
        console.log(data)
        var arr = [];
        for (i=0; i<data.length; i++){
          arr.push(data[i].text)
        }
      });



$("#button").click(function() {
  console.log(data);
});
