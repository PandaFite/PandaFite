/* streamFunctions.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var username = "pandafite";
var userId = "53010272";
var chatSrc;

function online() {
	document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&autplay=false";
	function getInfo(){

		$.ajax({
		 type: 'GET',
		 url: 'https://api.twitch.tv/kraken/streams/' + username,
		 headers: {
		   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
		 },
		 success: function(data) {
		   console.log(data);
		   document.getElementById('title').textContent = "LIVE: " + data.stream.channel.status;
		   document.getElementById('streaminfo').textContent = "Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		 }
		});
	} // end getInfo

	getInfo();
	setInterval(getInfo,10000);
	}

function ytDisplay() {
	$.ajax({
		 type: 'GET',
		 url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU9_eMg0RM31CFHIoFOd4Log&maxResults=1&key=AIzaSyDRGoNzXk7wVpE2lCXG9SS7wPMZhmFSEhI',
		 success: function(data) {
			console.log(data);
			document.getElementById('yt-title').textContent = "Recent Video: " + data.items[0].snippet.title;
			document.getElementById('yt-player').src = "https://www.youtube.com/embed/" + data.items[0].snippet.resourceId.videoId;


		 }, //end success
		 error: function () {
		}
		});	// end ajax

}

function streamOffline()
{
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
	 },
	 success: function(data) {
	   console.log(data);

	   	if (data._total == 0) {
			document.getElementById('title').textContent = "No streams found";
			document.getElementById('player').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
		}

		else {
			document.getElementById('title').textContent = "Most recent broadcast:";
			document.getElementById('streaminfo').textContent = " " + data.videos[0].title;
			document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autplay=false";
		}

	 }
	});
	chatSrc = "https://www.twitch.tv/" + username + "/chat";
}

function playerError() {
	document.getElementById('player').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
	document.getElementById('title').textContent = "Error loading video";
}
