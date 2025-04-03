var PushDates = [];
//contains
//{
//	name: String
//	lastPush: void	
//	commitUrl: String //commits_url
//	
//}

async function loadHome(){
	var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	console.log(window.location.href);
	var repoResponse = await fetch(pageLocation + "/" +"home.html"); 
	
	var homeContent = await repoResponse.text();
	contentEle.innerHTML = homeContent; 
	
}