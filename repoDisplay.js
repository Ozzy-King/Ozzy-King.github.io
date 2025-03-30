
var PushDates = [];
//contains
//{
//	name: String
//	lastPush: void	
//	commitUrl: String //commits_url
//	
//}

async function RepoDisplay(){
	var UsersName = "ozzy-king";

	var response = await fetch("https://api.github.com/users/"+UsersName+"/repos"); 
	var json = await response.text();
	var myArr = JSON.parse(json);
	//console.log(myArr.length);
	var x = document.getElementById("repoArea");
	
	for(let i = 0; i < myArr.length; i++){
		PushDates.push({name: myArr[i].name, 
						lastPush: myArr[i].pushed_at,
						commitUrl: myArr[i].commits_url.replace('{/sha}','') });
		
		let row1 = document.createElement("blockquote");
		let row = document.createElement("a");
		row.href = myArr[i].html_url;
		
		//add number of forks
		node = document.createElement("h2");
		node.innerHTML = myArr[i].name;
		row.appendChild(node);
		
		//desc
		node = document.createElement("span");
		console.log(myArr[i].description);
		node.innerHTML = myArr[i].description != null ? myArr[i].description : "NO DESCRIPTION";
		row.appendChild(node);
		
		node = document.createElement("br");
		row.appendChild(node);
		
		//add features
		node = document.createElement("span");
		node.innerHTML += "Top Lang: "+myArr[i].language;
		node.innerHTML += " | Created: "+myArr[i].created_at.split("T")[0];
		node.innerHTML += " | Last Push: "+myArr[i].pushed_at.replace("T", " ").substring(0, myArr[i].pushed_at.length-1);
		row.appendChild(node);
		
		//row.onclick = function() {redirecting(myArr[i].html_url)};
		
		row1.appendChild(row);
		x.appendChild(row1);
	}
	
	//sort pushs
	PushDates.sort((a, b) => new Date(b.lastPush) - new Date(a.lastPush));

	x = document.getElementById("latestPush");
	for(let i = 0; i < 3; i++){
		let row = document.createElement("div");
		
		node = document.createElement("h2");
		node.innerHTML +=  PushDates[i].lastPush.split("T")[0] + "<br/>&nbsp;&nbsp;-- " + PushDates[i].name;
		row.appendChild(node);
		
		//get the commit message, truncate it, and link to read more to push
		var response = await fetch(PushDates[i].commitUrl); 
		var json = await response.text();
		var myArr = JSON.parse(json);
		
		node = document.createElement("span");
		node.innerHTML += myArr[0].commit.message;
		row.appendChild(node);
		
		node = document.createElement("br");
		row.appendChild(node);
		
		row.innerHTML += "<span><a href=\""+myArr[0].html_url+"\">read more ...</a></span>";
		
		node = document.createElement("br");
		row.appendChild(node);
		x.appendChild(row);
	}
	
	console.log(PushDates);
}
function redirecting(url){window.location.href = url;}
