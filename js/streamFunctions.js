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
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + username + "-1280x720.jpg";
	pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}
		
	document.getElementById('chatcover').innerHTML = "<a href='#' onclick='pressChat(); return false;'><img src='img/chatcover.png' class='nodrag' style='height: 430px; width: 585px;' /></a>";
	pressChat = function() {
	
	document.getElementById('chatcover').innerHTML = "<iframe id='chatframe' style='border: none; height: 430px; width: 585px;' src='https://www.twitch.tv/" + username + "/chat'></iframe>"
	}
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
	   
	   	if (data._total == 0)
		{
			document.getElementById('title').textContent = "Error 404 - no stream data found";
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1280x720.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}
	   	 
		 var thumbRaw;
		if (data.videos[0].thumbnails[2] == null)
		{
		thumbRaw = data.videos[0].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[0].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-1280x720.jpg"
	   document.getElementById('vod-thumbnail').src = thumbHD;
	   
	   
	   
		var str = data.videos[0].created_at;
		var res = str.split("-");
		var day = res[2].split("T");
		var fullDate = res[1] + "/" + day[0] + "/" + res[0];
		
		var timeFull = day[1].split("Z");
		var time = timeFull[0].split(":");
		var hour = time[0];
		
		
		if (time[0] == 0)
		{
			hour = 5;
		}
		else if (time[0] >= 1 && time[0] <= 7)
		{
			hour = time[0] + 5;
		}
		else if (time[0] >= 8 && time[0] <= 19)
		{
			hour = time[0] - 7
		}
		else if (time[0] >= 20 && time [0] <= 24)
		{
			hour = time[0] - 19;
		}
		
		
		
		var minute = time[1];
		var timeOfDay = "AM"
		
		if (time[0] >= 8 && time[0] <= 19)
		{
			timeOfDay = " AM PST";
		}	
		else
		{
			timeOfDay = " PM PST";
		}	

		document.getElementById('title').textContent = "Most recent broadcast (" + fullDate + " at " + hour + ":" + minute + timeOfDay + "):";
		document.getElementById('streaminfo').textContent = " " + data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}

		
		
		
		
	 }
	});
	document.getElementById('chatcover').innerHTML = "<iframe src='https://discordapp.com/widget?id=221059861457141770&theme=light' style='border: none; height: 430; width: 585'></iframe>";
}

function streamOfflineFallback()
{
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
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1280x720.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}
	   	 
		 var thumbRaw;
		if (data.videos[0].thumbnails[2] == null)
		{
		thumbRaw = data.videos[0].thumbnails[0].url;
		}
		else {thumbRaw = data.videos[0].thumbnails[2].url;}
	   
		var str2 = thumbRaw.split("-");
		var noRes = str2[0] + "-" + str2[1];
		var thumbHD = noRes + "-1280x720.jpg"
	   document.getElementById('vod-thumbnail').src = thumbHD;
	   
	   
	   
		var str = data.videos[0].created_at;
		var res = str.split("-");
		var day = res[2].split("T");
		var fullDate = res[1] + "/" + day[0] + "/" + res[0];
		
		var timeFull = day[1].split("Z");
		var time = timeFull[0].split(":");
		var hour = time[0];
		
		
		if (time[0] == 0)
		{
			hour = 5;
		}
		else if (time[0] >= 1 && time[0] <= 7)
		{
			hour = time[0] + 5;
		}
		else if (time[0] >= 8 && time[0] <= 19)
		{
			hour = time[0] - 7
		}
		else if (time[0] >= 20 && time [0] <= 24)
		{
			hour = time[0] - 19;
		}
		
		
		
		var minute = time[1];
		var timeOfDay = "AM"
		
		if (time[0] >= 8 && time[0] <= 19)
		{
			timeOfDay = " AM PST";
		}	
		else
		{
			timeOfDay = " PM PST";
		}	

		document.getElementById('title').innerHTML = "<a href='https://gist.githubusercontent.com/matt3541/14aeb77786b67e74fcb96f16eac21869/raw/0722adf9e8372184ed6bad0331cb7cb3e988101b/gistfile1.txt' target='_blank'>(Host API error 1)</a> Most recent broadcast (" + fullDate + " at " + hour + ":" + minute + timeOfDay + "):";
		document.getElementById('streaminfo').textContent = " " + data.videos[0].title;
		
		pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		setTimeout(function() {
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		}, 500);
		}

		
		
		
		
	 }
	});
	document.getElementById('chatcover').innerHTML = "<iframe src='https://discordapp.com/widget?id=221059861457141770&theme=light' style='border: none; height: 430; width: 585'></iframe>";
}