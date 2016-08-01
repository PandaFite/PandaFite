var username = "pandaplayshd";

function displayTitle()
{
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
});}

function displayOffline()
{
	document.getElementById('title').textContent = "Stream Offline - Most Recent VOD:";
}

function onlineFrame()
{
	document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
}
function offlineFrame()
{
	$.ajax({
	 type: 'GET',
	 url: 'https://api.twitch.tv/kraken/channels/' + username + '/videos?broadcasts=true',
	 headers: {
	   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
	 },
	 success: function(data) {
	   console.log(data);
	   document.getElementById('player').src = "https://player.twitch.tv/?video=" + data.videos[0]._id + "&autoplay=false"
	 }
	});
}