/* streamFunctions.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var username = "pandaplayshd";

var pressPlay;

var pressChat;

var uptime;

function displayTitle()
{
	function getInfo(){
			
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
 },
 success: function(data) {
   console.log(data);
   document.getElementById('title').textContent = "\u2022 LIVE: " + data.stream.channel.status;
   if (data.stream.game == "Creative")
   {
	   document.getElementById('streaminfo').textContent = " | Being " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
   else{
   
   document.getElementById('streaminfo').textContent = " | Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
   }
 }
});	
		$.ajax({
		url: 'https://api.rtainc.co/twitch/uptime?channel=' + username,
		success: function (data) {
			var name = data.split(' ');
			var noComma = name[1].split(',');
			if (name[1] == "is" && name[2] == "not")
			{
				document.getElementById('uptime').textContent = "(uptime api error)";
			}
			else if (name[3] == "seconds")
			{
				document.getElementById('uptime').textContent = "(" + name[0] + " " + noComma[0] + " uptime)";
			}
			else
			{
			document.getElementById('uptime').textContent = "(" + data + " uptime)";
			}
		},
		dataType: "html"
		});
	}
	
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-1170x659.jpg";
	pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);	
		}
		
	//document.getElementById('chatcover').innerHTML = "<a href='#' onclick='pressChat(); return false;' style='display: block; width: 585px; height: 430px;'><span style='display: block;height: 430px; width: 585px; display: block; text-align: center;'><span style='font-size: 26px; line-height: 430px;'>Click to view chat</span></span></a>";
	
	pressChat = function() {
	document.getElementById('chatcover').innerHTML = "<iframe id='chatframe' style='border: none; height: 430px; width: 585px;' src='https://www.twitch.tv/" + username + "/chat'></iframe>"
	}

	
	timer();
}

var count = 8;
var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
var stopTimer;
function timer() {
    if (stopTimer != 1) {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            pressChat();
            stopTimer = 1;
            return;
        }

        document.getElementById("chatcover").innerHTML = "<a href='#' onclick='return false;' style='display: block; width: 585px; height: 430px;'><span style='display: block;height: 430px; width: 585px; display: block; text-align: center;'><span style='font-size: 26px; line-height: 430px;'>Chat loading in " + count + "&hellip;</span></span></a>";
    }
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
    stopTimer = 1;
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
	 },
	 success: function(data) {
	   console.log(data);
	   
	   	if (data._total == 0)
		{
			document.getElementById('title').textContent = "Error 404 - no stream data found";
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1170x659.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}
	   	 
		 var thumbRaw;
		if (data.videos[0].thumbnails == null)
		{
			try {
				thumbRaw = data.videos[0].thumbnails[0].url;
				formatThumbnail();
			}
			catch(err) {
				 document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1170x659.jpg";
			}
		}
		else {
			try {
			thumbRaw = data.videos[0].thumbnails[2].url;
			formatThumbnail();
			}
			catch(err) {
				 document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1170x659.jpg";
			}
		}
		
	   function formatThumbnail() {
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-1170x659.jpg"
	   document.getElementById('vod-thumbnail').src = thumbHD;
	   }
	   
	   
	   
		//var str = data.videos[0].created_at;
		//var res = str.split("-");
		//var day = res[2].split("T");
		

		//var realDay = day[0] - 1;
		//var fullDate = res[1] + "/" + realDay + "/" + res[0];

		
		//var timeFull = day[1].split("Z");
		//var time = timeFull[0].split(":");
		//var hour = time[0];
		

		//if (time[0] == 0)
		//{
		//	hour = 4; 
		//}
		//else if (time[0] >= 1 && time[0] <= 7)
		//{
		//	hour = time[0] + 4; 
		//}
		//else if (time[0] >= 8 && time[0] <= 19)
		//{
		//	hour = time[0] - 8 
		//}
		//else if (time[0] >= 20 && time [0] <= 24)
		//{
		//	hour = time[0] - 20; 
		//}
		
		
		
		//var minute = time[1];
		//var timeOfDay = "AM"
		
		//if (time[0] >= 8 && time[0] <= 19)
		//{
		//	timeOfDay = " AM PST";
		//}	
		//else
		//{
		//	timeOfDay = " PM PST";
		//}	

		document.getElementById('title').textContent = "Most recent broadcast:";
		document.getElementById('streaminfo').textContent = " " + data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-span').style.background = "url(img/loading-ring.svg) no-repeat center center";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('button-play-link').style.visibility = "hidden";
		}, 2500);
		
		} //end pressPlay

		
		
		
		
	 }
	});
	document.getElementById('chatcover').innerHTML = "<iframe src='https://discordapp.com/widget?id=221059861457141770&theme=dark' style='border: none; height: 430px; width: 585px'></iframe>";
	document.getElementById('chatcover').style.backgroundColor = "transparent";
}

function playerError() {
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-800x450.jpg";
	document.getElementById('title').textContent = "Error loading video";
	document.getElementById('button-play-link').style.visibility = "hidden";
}