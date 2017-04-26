/* streamFunctions.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var username = "pandaplayshd";
var userId = "64596";
var chatSrc;
var pressPlay;

function displayTitle()
{
	function getInfo(){
			
		$.ajax({
		 type: 'GET',
		 url: 'https://beam.pro/api/v1/channels/' + username,
		 success: function(data) {
		   console.log(data);
		   document.getElementById('title').textContent = "LIVE: " + data.name;	
		   document.getElementById('streaminfo').textContent = "Playing " + data.type.name + " for " + data.viewersCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.numFollowers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
		 }
		});	
	} // end getInfo
	
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
    document.getElementById('player').src = "https://beam.pro/embed/player/" + username;
	chatSrc = "https://beam.pro/embed/chat/" + username;
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
	 url: 'https://beam.pro/api/v1/channels/' + userId + '/recordings',
	 success: function(data) {
	   console.log(data);
	   
	   	if (data[data.length - 1] == undefined) {
			document.getElementById('player').src = "https://beam.pro/embed/player/" + username;
			document.getElementById('title').textContent = "Offline, no vods found";
		}
		else {
			// document.getElementById('title').textContent = "Most recent broadcast:";
			document.getElementById('title').textContent = "Currently offline";
			document.getElementById('streaminfo').textContent = data[data.length - 1].name;
			// fix this with proper embed link for vod
			document.getElementById('player').src = "https://placehold.it/800x450?text=Vod+support+coming+soon";
		}	
	 }
	});
}

function playerError() {
	document.getElementById('title').textContent = "Error loading video";
	document.getElementById('player').src = "https://beam.pro/embed/player/" + username;
}

window.onload = function() {
	if (window.innerWidth < 768) {
		document.getElementById("player").remove();
	}
}