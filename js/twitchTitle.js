$.getJSON('https://api.twitch.tv/kraken/channels/pandaplayshd?callback=?', function(data) {
			document.getElementById('title').textContent = data.status;
});