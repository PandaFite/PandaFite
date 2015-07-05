var twitchUserName = 'PandaPlaysHD'
$(document).ready(function() {    
   $.getJSON("https://api.twitch.tv/kraken/streams/"+twitchUserName+"?callback=?",function(streamData) {
      console.log('Stream Data:', streamData)
      if(streamData && streamData.stream) {
         $('#streamWidget').html("<b style='color: red;font-size:20px'> &#149 </b><b>LIVE</b>")
      } else {
         $('#streamWidget').html("<b>OFFLINE</b>")
      }
   })
})