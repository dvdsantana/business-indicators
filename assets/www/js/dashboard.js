panelApp.wsIndex = panelApp.HOST + 'ws/node';

panelApp.retrieveEnterprise = function() {
	$.ajax({
	      url: panelApp.wsIndex,
	      type: 'GET',
	      // type of data sent to the server
		  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		  // type of data received from server
	      dataType: 'json',
	}).done(panelApp.indexDone)
	.fail(panelApp.indexFail)
	.always(panelApp.indexAlways);
}

panelApp.indexDone = function(data, textStatus, jqXHR){
	var item;
	
	for (item in data) {
		var li = $("<li></li>");
		var a = $("<a></a>").attr("href", "#pgEnterprise")
        .attr("data-transition", "slide").text(data[item].title);
		
		$(li).append(a);
		$("#enterprisesList").append(li);
	}
	$("#enterprisesList").listview('refresh');	
}

$(document).on('pageinit', '#pgEnterprise', function(event) {
	$('ul#enterprisesList').on('click', 'li', panelApp.showEnterprise);
});

panelApp.showEnterprise = function(event) {
	panelApp.showObject(event);
}

panelApp.indexFail = function(jqXHR, textStatus, errorThrown){
	alert('fail: ' + panelApp.wsIndex);
}

panelApp.indexAlways = function(jqXHR, textStatus){
	//alert('always');
}