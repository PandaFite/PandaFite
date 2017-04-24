/* status.js
 * Copyright (C) mattunderscore.us - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
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
           // will put host stuff here later
	       streamOffline();
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