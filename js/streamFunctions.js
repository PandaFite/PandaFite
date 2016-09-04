var username = "pandaplayshd";

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
   document.getElementById('title').textContent = data.stream.channel.status;
   document.getElementById('streaminfo').textContent = " | Playing " + data.stream.game + " for " + data.stream.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " viewers and " + data.stream.channel.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
 }
});
	}
	getInfo();
	setInterval(getInfo,10000);
	}

function onlineFrame()
{
	document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
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
	   document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false";
	   
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
		
		
		
		
	 }
	});
}