$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
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
	   displayOffline();
	   offlineFrame();
   }
 }
});