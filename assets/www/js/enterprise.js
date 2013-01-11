//Variable Hoisting

panelApp.showEnterpriseById = function(event)
{
	var enterpriseInfo;
	
	enterpriseInfo = JSON.parse(sessionStorage.getItem('enterpriseInfo'));
	
	$('#enterpriseName').text(enterpriseInfo.title);
	
	$('#enterpriseTable').dataTable();
	
	
}

$(document).on('pageinit', '#pgEnterprise', panelApp.showEnterpriseById);

//Variable Hoisting