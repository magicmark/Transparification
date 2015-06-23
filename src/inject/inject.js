'use strict';

var endpoint = 'http://transparification.herokuapp.com';

var box = '\
<!-- Inserted by Transparification Chrome Extension -->\
<div id="transparification">\
Loading site ownership info...\
</div>';

chrome.extension.sendMessage({}, function(response) {
	var loadInterval = setInterval(function() {
		clearInterval(loadInterval);

    $(document.body).prepend(box);

    $.get(endpoint + "/info/" + window.location.hostname, function (result) {
      console.dir(result);
      if (result.success) {
        $("#transparification").text(result.info);
      } else {
        $("#transparification").text("Could not find any data relating to this site. Contribute?");        
      }

    })

	}, 10);
});