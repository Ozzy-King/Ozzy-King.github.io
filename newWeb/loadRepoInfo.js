var PushDates = [];
//contains
//{
//	name: String
//	lastPush: void	
//	commitUrl: String //commits_url
//	
//}
var knownLanguages = ["c", "c++", "csharp", "html"]

async function loadRepos(){
	var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	
	var UsersName = "ozzy-king";
	var repoResponse = await fetch("https://api.github.com/users/"+UsersName+"/repos"); 
	var json = await repoResponse.text();
	let myArr = JSON.parse(json);
	
	for(let i = 0; i < myArr.length; i++){
		PushDates.push({name: myArr[i].name, 
						lastPush: myArr[i].pushed_at,
						commitUrl: myArr[i].commits_url.replace('{/sha}','') });
		
		var row = document.createElement("div");

		var info = document.createElement("div");
		info.onclick = ()=>{ redirecting(myArr[i].html_url); };		

		//add repo name
		node = document.createElement("h3");
		node.innerHTML = myArr[i].name;
		info.appendChild(node);
		
		//desc
		node = document.createElement("p");
		node.innerHTML = myArr[i].description != null ? myArr[i].description : "NO DESCRIPTION";
		info.appendChild(node);
		
		//add features
		node = document.createElement("p");
		node.innerHTML += "Top Lang: "+myArr[i].language;
		node.innerHTML += " | Created: "+myArr[i].created_at.split("T")[0];
		node.innerHTML += " | Last Push: "+myArr[i].pushed_at.replace("T", " ").substring(0, myArr[i].pushed_at.length-1);
		node.classList.add("repoInfo");
		info.appendChild(node);
		
		//row.onclick = function() {redirecting(myArr[i].html_url)};
		row.appendChild(info);
		
		//add top language logo
		var img = document.createElement("div");
		img.classList.add("repolang");
		node = document.createElement("img");
		var lang = myArr[i].language != null ? myArr[i].language : "null";
		lang = lang.toLowerCase();
		lang = lang.replace("#", "sharp");
		console.log(lang);
		if(knownLanguages.includes(lang )){
			node.src = "Logo/"+lang +".png";
		}else{
			node.src = "Logo/null.png";
		}
		img.appendChild(node);
		row.appendChild(img);
		
		
		//add image if the repo has pages attached
		img = document.createElement("div");
		img.classList.add("repopage");
		node = document.createElement("img");
		if(myArr[i].has_pages){
			
			node.src = "pageimage.png";
			node.onclick = ()=>{ redirecting(pageLocation+"/"+myArr[i].name); };
		}	
		img.appendChild(node);
		row.appendChild(img);
		
		contentEle.appendChild(row);
		row.classList.add("repoitem");
	}
		//sort pushs
	PushDates.sort((a, b) => new Date(b.lastPush) - new Date(a.lastPush));
	
}

function redirecting(url){window.location.href = url;}