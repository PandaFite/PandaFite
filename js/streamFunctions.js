var username = "pandaplayshd";

var pressPlay;

function displayTitle()
{
	function getInfo(){
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + username,
 headers: {
   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
 },
 success: function(data) {
   console.log(data);
   document.getElementById('title').textContent = "\u2022 LIVE: " + data.stream.channel.status;
   document.getElementById('streaminfo').textContent = " | Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
 }
});
	}
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/previews-ttv/live_user_pandaplayshd-1280x720.jpg";
	pressPlay = function() {
		document.getElementById('button-play-link').style.visibility = "hidden";
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
		}
}


function streamOffline()
{
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
	 },
	 success: function(data) {
	   console.log(data);
	   // document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false";
	   
	   	if (data._total == 0)
		{
			document.getElementById('title').textContent = "Error 404 - no stream data found";
			document.getElementById('vod-thumbnail').src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-1280x720.jpg";
			document.getElementById('button-play-link').style.visibility = "hidden";
		}
	   	   
	   var thumbRaw = data.videos[0].thumbnails[2].url;
	   
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
		
		if (time[0] >= 1 && time[0] <= 7)
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
		document.getElementById('vod-thumbnail').style.visibility = "hidden";
		document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id;
		}

		
		
		
		
	 }
	});
}