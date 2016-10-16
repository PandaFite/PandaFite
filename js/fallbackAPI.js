function fallbackAPI ()
{

$.ajax({
	 type: 'GET',
	 url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=53010272',
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
		document.getElementById('chatframe').src = "https://www.twitch.tv/" + data.hosts[0].target_login + "/chat";
		document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + data.hosts[0].target_login + "-1280x720.jpg";
		
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&muted";
		}
		function getHostInfo() {
		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
		 headers: {
		   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
		 },
		 success: function(data) {
		   console.log(data);
		   document.getElementById('title').innerHTML =   "<a href='https://gist.githubusercontent.com/matt3541/14aeb77786b67e74fcb96f16eac21869/raw/0722adf9e8372184ed6bad0331cb7cb3e988101b/gistfile1.txt' target='_blank'>(Host API error 1)</a> Panda is currently hosting " + data.stream.channel.display_name + ": " + data.stream.channel.status;
		   if (data.stream.game == "Creative")
		   {
			   document.getElementById('streaminfo').textContent = " | Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		   else{
		   
		   document.getElementById('streaminfo').textContent = " | Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		   }
		 }
		});


		}
		getHostInfo();
		setInterval(getHostInfo,10000);
		
	   }
	 },
	 error: function(data) {
		document.getElementById('title').textContent = "Host API failed.";
	 }
	});
}