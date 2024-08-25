


function createCookie(name, val, path = "/"){
	document.cookie = name+"="+val+"; path="+path+";";
}

function getCookie(name){
	var co = document.cookie;
	var cookList = co.split("; ");
	for(var i =0; i < cookList.length; i++){
		var temp = cookList[i].split("=");
		if(temp[0] == name){
			return temp[1];
		}
	}
	
}

function updateCookie(name, val, path = "/"){
	document.cookie = name+"="+val+"; path="+path+";";	
}

function removeCookie(name, path = "/"){
	document.cookie = name+"=; path="+path+";";
}