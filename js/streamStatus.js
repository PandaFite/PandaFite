$(document).ready(function() {    
   $.getJSON("https://api.twitch.tv/kraken/streams/PandaPlaysHD?callback=?",function(streamData) {
      console.log('Stream Data:', streamData)
      if(streamData && streamData.stream) {
         $('#streamWidget').html("<b>[LIVE]</b>")
      } else {
         $('#streamWidget').html("")
      }
   })
})