function displayTitle()
{
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/' + username,
 headers: {
   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
 },
 success: function(data) {
   console.log(data);
   document.getElementById('title').textContent = data.status + " | Game: " + data.game + " | Followers: " + data.followers;
 }
});}