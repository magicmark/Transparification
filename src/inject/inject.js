'use strict';

//var endpoint = 'http://transparification.herokuapp.com';
var endpoint = 'http://localhost:3451';

var box = '\
<!-- Inserted by Transparification Chrome Extension -->\
<div id="transparification">\
Loading site ownership info...\
</div>';

chrome.extension.sendMessage({}, function(response) {
	var loadInterval = setInterval(function() {
		clearInterval(loadInterval);

    $(document.body).prepend(box);

    $.ajax({
      type: "GET",
      beforeSend: function (req) {
        req.setRequestHeader("API-Version", "0.2");
      },
      url: endpoint + "/info/" + window.location.hostname,
      success: function (result) {
        if (result.success) {
          $("#transparification").text(result.info);
        } else {
          $("#transparification").text("Could not find any data relating to this site. Contribute?");        
        }
      }
    });

	}, 10);
});