



$("#button").click(function() {
  console.log('twitterHandle' + $('#twitterHandle').text())
   $.ajax({
        method: 'get',
        url: '/api/twitter/' + $('#twitterHandle').text()
      })
      .done(function(data){
        console.log(data)
        var arr = [];
        for (i=0; i<data.length; i++){
          arr.push(data[i].text)
        }
      });
});

// $("#button2").click(function() {
//   console.log('hi');
//   console.log('twitterHandle' + $('#twitterHandle').text())
// });
