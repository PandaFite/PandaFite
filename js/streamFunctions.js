/*
	streamFunctions.js
	Copyright (C) Matt Jones - All Rights Reserved
*/
var username = "pandafite";
var userId = "53010272";
var chatSrc;

function online() {
	$("#player").attr("src", "https://player.twitch.tv/?channel=" + username +"&autoplay=false");
	function getInfo() {
		$.ajax({
			type: 'GET',
			url: 'https://api.twitch.tv/kraken/streams/' + username,
			headers: {
				'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
			},
			success: function(data) {
				console.log(data);
				$("#title").text("LIVE: " + data.stream.channel.status);
				$("#streaminfo").text("Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				 + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers");
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
			$("#yt-title").text("Recent Video: " + data.items[0].snippet.title);
			$("#yt-player").attr("src", "https://www.youtube.com/embed/" + data.items[0].snippet.resourceId.videoId);
		} //end success
	});	// end ajax
}

function streamOffline() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
		headers: {
			'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
		},
		success: function(data) {
			console.log(data);
			if (data._total == 0) {
				$("#title").text("No streams found");
				$("#player").attr("src", "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg");
			}
			else {
				$("#title").text("Most recent broadcast:");
				$("#streaminfo").text(" " + data.videos[0].title);
				$("#player").attr("src", "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false");
			}
		} // end success
	}); // end ajax
	chatSrc = "https://www.twitch.tv/" + username + "/chat";
}

function playerError() {
	$("#player").attr("src", "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg");
	$("#title").text("Error loading video");
}
