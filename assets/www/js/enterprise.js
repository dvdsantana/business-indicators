//Variable Hoisting

panelApp.showEnterpriseById = function(event, data) {
	panelApp.showObject(event);
};

$(document).on('pageshow', '#pgEnterprise', panelApp.showEnterpriseById);

//Variable Hoisting