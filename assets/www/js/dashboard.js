panelApp.wsIndex = panelApp.HOST + 'ws/node';

panelApp.getEnterprise = function()
{
	$.ajax(
	{
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

//TODO
panelApp.indexFail = function(jqXHR, textStatus, errorThrown)
{
	alert('fail: ' + panelApp.wsIndex);
}

//TODO
panelApp.indexAlways = function(jqXHR, textStatus)
{

}

panelApp.indexDone = function(data, textStatus, jqXHR)
{
	var item;
	
	for (item in data)
	{
		var li = $('<li></li>').attr('idEnterprise', data[item].nid);
		var a = $('<a></a>').attr('href', '#pgEnterprise')
        .attr('data-transition', 'slide').text(data[item].title);
		
		$(li).append(a);
		$('#enterprisesList').append(li);
	}
	$('#enterprisesList').listview('refresh');
	
	$('#enterprisesList').on('click', 'li', panelApp.showEnterprise);
}

panelApp.showEnterprise = function()
{	
	panelApp.getEnterpriseById($(this).attr('idEnterprise')); // this = <li>
}

panelApp.getEnterpriseById = function(id)
{
	$.ajax(
	{
	      url: panelApp.wsIndex + '/' + id,
	      type: 'GET',
	      // type of data sent to the server
		  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		  // type of data received from server
	      dataType: 'json',
	}).done(panelApp.enterpriseDone)
	.fail(panelApp.enterpriseFail)
	.always(panelApp.enterpriseAlways);
}

panelApp.enterpriseDone = function(data, textStatus, jqXHR)
{
	if(typeof(Storage) !== "undefined")
	{
		// Yes! localStorage and sessionStorage support!
		// Storage save objects as String so we need serialize data
		sessionStorage.setItem('enterpriseInfo', JSON.stringify(data));
		$.mobile.changePage('enterprise.html');
	} else
	{
		alert('Sorry! No web storage support..');
	}
}

//TODO
panelApp.enterpriseFail = function()
{
	
}

//TODO
panelApp.enterpriseAlways = function()
{
	
}