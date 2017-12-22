/* status.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
ytDisplay();
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
   online();
   }
   else
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=' + userId,
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null) {
			streamOffline();
	   }
	   else {
       document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&autplay=false";

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

		   document.getElementById('title').textContent = "Panda is currently hosting " + data.stream.channel.display_name;
		   document.getElementById('streaminfo').textContent = data.stream.channel.status;
		   chatSrc = "https://www.twitch.tv/" + data.stream.channel.name + "/chat";
		   }
		   else streamOffline();
		 }
		});


		}
		//auto update 10s interval
		getHostInfo();
		setInterval(getHostInfo,10000);

	   }
	 },
	 error: function()
	 {
		 playerError();
	 }
	});
   }
 },
 error: function() {
	 playerError();
 }
});
