var currentTab;
var pageLocation;

function gotoTab(tabStr){
	currentTab.classList.remove("navselected");
	currentTab = document.getElementById(tabStr);
	currentTab.classList.add("navselected");
}
function isTab(tabStr){
	return currentTab == document.getElementById(tabStr);
}

window.onload = function(){
	pageLocation = "https://ozzy-king.github.io";
	currentTab = document.getElementById("homeTab");
	
	document.getElementById("publicRepoTab").onclick=async() => {
		if(!isTab("publicRepoTab")){
			gotoTab("publicRepoTab");
			await loadRepos();
		}
	};
	console.log("added onclick for publicRepoTab");
		
	document.getElementById("homeTab").onclick=async() => {
		if(!isTab("homeTab")){
			gotoTab("homeTab");
			await loadHome();
		}
	};
	console.log("added onclick for homeTab");
	
	
	document.getElementById("certificateTab").onclick=async() => {
		if(!isTab("certificateTab")){
			gotoTab("certificateTab");
			await loadCert();
		}
	};
	console.log("added onclick for certificateTab");
}