/* status.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
window.onload = function() {
 
ytDisplay();
$.ajax({
 type: 'GET',
 url: 'https://beam.pro/api/v1/channels/' + username,
 success: function(data) {
   console.log(data);
   if (data.online == true)
   {
   displayTitle();
   onlineFrame();
   }
   else 
   {
	$.ajax({
	 type: 'GET',
	 url: 'https://beam.pro/api/v1/channels/' + userId + '/hostee',
	 success: function(data) {
	   console.log(data);
	   if (data.statusCode == 404)
	   {
			streamOffline();
	   }
	   else
	   {
		   document.getElementById('title').textContent = "Panda is currently hosting " + data.token;
		   document.getElementById('streaminfo').textContent = data.name +  " - Playing " + data.type.name + " for " + data.viewersCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +  " viewers and " + data.numFollowers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " followers";
           document.getElementById('player').src = "https://beam.pro/embed/player/" + data.token;
			chatSrc = "https://beam.pro/embed/chat/" + data.token;
	   }
	 },
	 error: function()
	 {
		streamOffline();
	 }
	});
   }
 },
 error: function() {
	 playerError();
 }
});

}