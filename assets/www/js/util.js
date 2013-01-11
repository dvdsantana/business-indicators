var panelApp = {};


panelApp.getUrlVars = function()
{
	alert("leyendo url...");
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
	for(var i = 0; i < hashes.length; i+=1)
	{
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	}
	
	return vars;
}

panelApp.showObject = function(obj)
{
	alert(panelApp.serializeObject(obj));
}

panelApp.serializeObject = function(obj)
{
	var returnVal;	
	if(obj != undefined)
	{
		switch(obj.constructor)
		{
			case Array:
				var vArr="[";
				for(var i=0;i<obj.length;i++)
				{
					if(i>0) vArr += ",";
					vArr += panelApp.serializeObject(obj[i]);
				}
				vArr += "]"
				return vArr;
			case String:
				returnVal = escape("'" + obj + "'");
				return returnVal;
			case Number:
				returnVal = isFinite(obj) ? obj.toString() : null;
				return returnVal;				
			case Date:
				returnVal = "#" + obj + "#";
				return returnVal;		
			default:
				if(typeof obj == "object")
				{
					var vobj=[];
					for(attr in obj)
					{
						if(typeof obj[attr] != "function")
						{
							vobj.push('"' + attr + '":' + panelApp.serializeObject(obj[attr]));
						}
					}
						if(vobj.length >0)
							return "{" + vobj.join(",") + "}";
						else
							return "{}";
				}		
				else
				{
					return obj.toString();
				}
		}
	}
	return null;
}