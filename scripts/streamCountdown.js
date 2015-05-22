var countDown = (function() {
  var startStream;
  var endStream;
  var streamingText = 'Scheduled to currently be live.';
  var updateElement;

  // Pad single digit numbers
  function pad(n) {
    return (n<10?'0':'') + +n;
  }

  // Format a time difference as hh:mm:ss
  // d0 and d1 are date objects, d0 < d1
  function timeDiff(d0, d1) {
    var diff = d1 - d0;
    return pad(diff/3.6e6|0) + ' hours, ' + pad((diff%3.6e6)/6e4|0) + ' minutes, ' + pad(diff%6e4/1000|0) + ' seconds';
  }

  // start, end are UNIX UTC time values in seconds for the start and end of streaming
  return function(elementId, start, end) {
    var now = new Date();
    var returnValue;

    // By default, run again just after next full second
    var delay = 1020 - now.getMilliseconds();

    // turn start and end times into local Date objects
    if (start) startStream = new Date(start*1000);
    if (end) endStream = new Date(end*1000);

      // If now is after endStream, add 1 day,
      // Use UTC to avoid daylight saving adjustments
      if (now > endStream) {
        endStream.setUTCHours(endStream.getUTCHours() + 24);
        startStream.setUTCHours(startStream.getUTCHours() + 24);
      }

    // Store the element to write the text to
    if (elementId) updateElement = document.getElementById(elementId);

    // If it's streaming time, return streaming text
    if (now >= startStream && now < endStream) {
      returnValue = streamingText;

      // Run again after streaming end time
      delay = endStream - now;

    } else {
      // Otherwise, count down to startStream
      returnValue = timeDiff(now, startStream);
    }

    // Write the time left or streaming text
    updateElement.innerHTML = returnValue;

    // Call again when appropriate
    setTimeout(countDown, delay);
  };
}());


// Testing code

// Create dates for a local time of 21:00 today
var myStart = new Date();
myStart.setHours(16,0,0,0);
var myEnd = new Date()
myEnd.setHours(19,0,0,0);

// Create UNIX time values for same time as UTC
var startUTCTimeValue = myStart/1000|0
var endUTCTimeValue   = myEnd/1000|0

// Run when page loads
window.onload = function() {
  countDown('foo', startUTCTimeValue, endUTCTimeValue);
}
