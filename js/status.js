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
   displayTitle();
   onlineFrame();
   }
   else 
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=' + userId,
	 success: function(data) {
	   console.log(data);
	   if (data.hosts[0].target_login == null)
	   {
			streamOffline();
	   }
	   else
	   {   
		 
		
		//set thumbnail to that of the hosted streamer
		document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + data.hosts[0].target_login + "-1170x659.jpg";
		
		//define pressPlay function for this situation
		pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + data.hosts[0].target_login +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);
		
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
		   
		   document.getElementById('title').textContent = "Panda is currently hosting " + data.stream.channel.display_name;  
		   document.getElementById('streaminfo').textContent = data.stream.channel.status;
		   chatSrc = "https://www.twitch.tv/" + data.stream.channel.name + "/chat";
		   timer();
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