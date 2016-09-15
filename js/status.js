$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   if (data.stream)
   {
   displayTitle();
   onlineFrame();
   }
   else 
   {
	   streamOffline();
   }
 }
});