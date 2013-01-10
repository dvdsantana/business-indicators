//Variable Hoisting

panelApp.showEnterpriseById = function(event, data) {
	alert('ready');
	panelApp.showObject(data);
};

$('#pgEnterprise').on('pagechange', panelApp.showEnterpriseById);

//Variable Hoisting