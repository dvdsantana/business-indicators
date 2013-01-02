var panelApp = {};


panelApp.getUrlVars = function() {
	alert("leyendo url...");
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
	for(var i = 0; i < hashes.length; i+=1) {
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	}
	
	return vars;
}

panelApp.showObject = function(obj) {
	var items = '';
	
	for(var key in obj) {
		items = items + '\n -' + key + ': ' + obj[key];
	}
	alert(items);
}