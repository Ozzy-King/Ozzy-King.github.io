

async function loadCert(){
	var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	console.log(window.location.href);
	var repoResponse = await fetch(pageLocation + "/" +"cert.html"); 
	
	var homeContent = await repoResponse.text();
	contentEle.innerHTML = homeContent; 
	
}