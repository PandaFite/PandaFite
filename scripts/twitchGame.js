$.getJSON('https://api.twitch.tv/kraken/channels/pandaplayshd?callback=?', function(data) {
			document.getElementById('game').textContent = data.game;
});