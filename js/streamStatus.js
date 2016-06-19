$(document).ready(function() {   

	var twitchName = "pandaplayshd";
	var youtubeName = "pandaplaysmchd";
   $.getJSON("https://api.twitch.tv/kraken/streams/" + twitchName + "?callback=?",function(streamData) {
      console.log('Stream Data:', streamData)
      if(streamData && streamData.stream) {
         $.getJSON('https://api.twitch.tv/kraken/channels/' + twitchName + '?callback=?', function(data) {
			document.getElementById('title').textContent = "Stream is live - \"" + data.status + "\"";
			document.getElementById('player').src = "https://player.twitch.tv/?channel=" + twitchName;
});
      } else {
         document.getElementById('title').textContent = "Stream is offline";
		 document.getElementById('player').src = "https://player.twitch.tv/?channel=" + twitchName;
      }
   })
})