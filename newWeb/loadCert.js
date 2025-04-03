

async function loadCert(){
	var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	
	var repoResponse = await fetch("certs.txt"); 
	var certText = await repoResponse.text();
	certText = certText.replaceAll("\n", "");
	//certText = certText.replace("\n", "");
	console.log(certText);
	var certJSON = JSON.parse(certText);
	console.log(certJSON);
	
}