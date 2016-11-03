function fallbackAPI ()
{

$.ajax({
	 type: 'GET',
	 url: 'https://jsonp.afeld.me/?url=https%3A%2F%2Ftmi.twitch.tv%2Fhosts%3Finclude_logins%3D1%26host%3D53010272',
	  headers: {
	'origin': 'pandaplayshd'
	},
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null)
	   {
			streamOfflineFallback();
	   }
	   else
	   {
		//define pressChat function for this situation
		pressChat = function() {
			document.getElementById('chatcover').innerHTML = "<iframe id='chatframe' style='border: none; height: 430px; width: 585px;' src='https://www.twitch.tv/" + data.hosts[0].target_login + "/chat'></iframe>"
		}	   
		 
		//set html for chat cover
		document.getElementById('chatcover').innerHTML = "<a href='#' onclick='pressChat(); return false;' style='display: block; width: 585px; height: 430px;'><span style='display: block;height: 430px; width: 585px; display: block; text-align: center;'><span style='font-size: 26px; line-height: 430px;'>Click to view chat</span></span></a>";
		
		//set thumbnail to that of the hosted streamer
		document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + data.hosts[0].target_login + "-1280x720.jpg";
		
		//define pressPlay function for this situation
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}
		
		//get title, viewers, game, etc from hosted streamer
		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
		 },
		 success: function(data) {
		   console.log(data);
		   if (data.stream) {
		   
		   document.getElementById('title').textContent = "Panda is currently hosting " + data.stream.channel.display_name + ": " + data.stream.channel.status;
		   if (data.stream.game == "Creative")
		   {
			   document.getElementById('streaminfo').textContent = " | Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		   else{
		   
		   document.getElementById('streaminfo').textContent = " | Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		   }
		   else {streamOffline();}
		 }
		});


		}
		//auto update 10s interval
		getHostInfo();
		setInterval(getHostInfo,10000);
		
	   }
	 },
	 error: function(data) {
		document.getElementById('title').textContent = "Host API failed.";
	 }
	});
}