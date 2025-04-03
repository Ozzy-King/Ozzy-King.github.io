

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
	
	for(let i = 0; i  < certJSON.length; i++){
		var row = document.createElement('div');
		
		var issuerLogo = document.createElement('img');
		issuerLogo.src = "logo/"+certJSON[i].Issuer.toLowerCase()+".png";
		row.appendChild(issuerLogo);
		
		var CertName = document.createElement('h3');
		issuerLogo.innerText = "logo/"+certJSON[i].title+".png";
		row.appendChild(CertName);
		
		
		var infoholder = document.createElement('div');
		var info = document.createElement('p');
		info.innerText = "issued: "+certJSON[i].issued;
		infoholder.appendChild(info);
		
		info = document.createElement('p');
		info.innerText = "expires: "+certJSON[i].expire;
		infoholder.appendChild(info);
		
		row.appendChild(infoholder);
		
		contentEle.appendChild(row);
	}
	issueLogo.src = "logo/"
	
}