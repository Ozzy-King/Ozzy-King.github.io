
var _darkMode = 0;

//window.addEventListener("load", function(){browserSetup();});

//once loaded run function
window.onload = async function(){
	OnloadFunc();
	setRootURL();
	if(getCookie("currentState") != "null" && getCookie("reload?") == "true"){
		var event = JSON.parse(getCookie("currentState"));
		await loadPageOnEvent(event);
	}
	else{
		await loadPage('homePage');
	}
}

function OnloadFunc(){
	
	_darkMode = getCookie("darkMode");
	if(_darkMode == "null"){_darkMode = 0;}
	
	console.log("darkmode cookie: " + getCookie("darkMode"));
	
	if(_darkMode == 1){ darkModeOn(); }
	else{ lightModeOn(); }
}

//dark and lihgt mode functions
function darkModeOn(){
	_darkMode = 1;
	console.log("darkmode: "+_darkMode);
	
	document.getElementsByClassName("divider")[0].style.backgroundColor = "#3c6a97";
	
	var body = document.getElementById("body");
	body.style.background = "#201f1d";
	body.style.color = "#898989";
	
	document.getElementById("darkButton").style.textDecoration = "line-through";
	document.getElementById("darkButton").classList.remove("buttons");
	
	document.getElementById("lightButton").style.textDecoration = "none";
	document.getElementById("lightButton").classList.add("buttons");
	updateCookie("darkMode", _darkMode, "/");
}
function lightModeOn(){
	_darkMode = 0;
	console.log("darkmode: "+_darkMode);
	
	document.getElementsByClassName("divider")[0].style.backgroundColor = "#417777";
	
	var body = document.getElementById("body");
	body.style.background = "#5E4017";
	body.style.color = "#BAA600";
	
	document.getElementById("darkButton").style.textDecoration = "none";
	document.getElementById("darkButton").classList.add("buttons");
	
	document.getElementById("lightButton").style.textDecoration = "line-through";
	document.getElementById("lightButton").classList.remove("buttons");
	updateCookie("darkMode", _darkMode, "/");
}