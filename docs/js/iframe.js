var username = "pandaplayshd";

function onlineFrame()
{
	document.getElementById('player').src = "https://player.twitch.tv/?channel=" + username +"&muted";
}
function offlineFrame()
{
	document.getElementById('player').src = "https://pandaplayshd.com/offline";
}