//panelApp.HOST = 'http://davidsantana.es/drupal/';
panelApp.HOST = 'http://santana/drupal/';

panelApp.wsConnect = panelApp.HOST + 'ws/system/connect';
panelApp.wsLogin = panelApp.HOST + 'ws/user/login';
panelApp.wsLogout = panelApp.HOST + 'ws/user/logout';

panelApp.ROL = [4];

$(document).on('pageinit', '#pgWelcome', function(event) {
	panelApp.showButtons();
	document.addEventListener("deviceready", panelApp.connect, false);
});

panelApp.showButtons = function() {
	$('#cmdLogIn').click(panelApp.logIn);
	$('#cmdLogOut').click(panelApp.logOut);
	$('#cmdLogOut').hide();
}

panelApp.connect = function() {
	
	$('#notification').text($('#notification').text() + '\nConnecting...');
	
	$.ajax({
	      url: panelApp.wsConnect,
	      type: 'POST',
	}).done(panelApp.connectDone)
	.fail(panelApp.connectFail)
	.always(panelApp.connectAlways);
}

panelApp.connectDone = function(data, textStatus, jqXHR) {
	
	var msg = 'Connect done! Redirecting to login page... \n';
	
	// User is not logged then uid (user id) = 0
	if (parseInt(data.user.uid, 10) == 0)
		$.mobile.loadpage("login.html", { transition: 'slideup'} );
	else
		panelApp.loginDone(data);
}

panelApp.connectFail = function(jqXHR, textStatus, errorThrown) {
	
	var msg = errorThrown + ' connectFail Status: ' + textStatus;
	
	$('#notification').text($('#notification').text() + msg);
}

panelApp.connectAlways = function (jqXHR, textStatus)  {
//TODO
}

panelApp.logIn = function() {
	
	var username = $('input#username').val();
	var password = $('input#password').val();
	
	var data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
	
	$('#notification').text($('#notification').text() + '\nLoging...');
	
	$.ajax({
	      url: panelApp.wsLogin,
	      type: 'POST',
	      data: data,
	      // type of data sent to the server
		  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		  // type of data received from server
	      dataType: 'json',
	}).done(panelApp.loginDone)
	.fail(panelApp.loginFail)
	.always(panelApp.loginAlways);
}

panelApp.loginDone = function(data, textStatus, jqXHR) {
	
	if (panelApp.userIsGranted(data)) {
		// Store uuid into database
		//panelApp.storeDeviceDB();
		
		panelApp.showButtons();
		panelApp.getEnterprise();
		$.mobile.changePage('dashboard.html');
		
	} else {
		var msg = ' Connected user without sufficient permissions';
		$('#notification').text($('#notification').text() + msg);
		$('#cmdLogIn').hide();
		$('#cmdLogOut').show();
	}

}

panelApp.userIsGranted = function(data) {
	var oRoles = data.user.roles;
	var i = 0, granted = false;
	
	for (i = 0; i < panelApp.ROL.length && !granted; i++) {
		granted = (oRoles.hasOwnProperty(panelApp.ROL[i]));
	}
	
	return granted;
}

panelApp.storeDeviceDB = function () {
//	TODO
	var deviceID = device.uuid;
}

panelApp.loginFail = function(jqXHR, textStatus, errorThrown) {
	
	var msg = 'Login fail! Status: ' + jqXHR.status + 'Text: ' + textStatus + 'Error: ' + errorThrown;
	
//	Already logged in
	if (jqXHR.status === 406)
		panelApp.loginDone(data, textStatus, jqXHR);
	else
		alert(msg);
}

panelApp.loginAlways = function (jqXHR, textStatus)  {
//	TODO
}

panelApp.storeDevice = function (deviceID) {
//	TODO
}

panelApp.logOut = function() {
	
	$.ajax({
		url: panelApp.wsLogout,
		type: 'POST'
	}).done(panelApp.logOutDone)
	.fail(panelApp.logOut.Fail)
	.always(panelApp.logOutAlways);
}

panelApp.logOutDone = function(data, textStatus, jqXHR) {
	
	$('#cmdLogOut').hide();
	$.mobile.loadPage('index.html');
}

panelApp.logOutFail = function(jqXHR, textStatus, errorThrown) {
//	TODO
}

panelApp.logOutAlways = function (jqXHR, textStatus)  {
//	TODO
}