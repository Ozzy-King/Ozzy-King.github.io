
//once loaded run function
async function JS_PAGE_INIT(){
	await newSearch();
}


async function newSearch(){
	var UsersName = "ozzy-king";

	var response = await fetch("https://api.github.com/users/"+UsersName+"/repos"); 
	var json = await response.text();
	var myArr = JSON.parse(json);
	console.log(myArr.length);
	var x = document.getElementById("repoArea");
	
	for(let i = 0; i < myArr.length; i++){
		let row = document.createElement("blockquote");
		
		//myArr[i].name
		//
		//myArr[i].description
		//myArr[i].language
		//
		//myArr[i].pushed_at.replace("T", " ").substring(0, myArr[i].pushed_at.length-1)
		//
		
		//add number of forks
		node = document.createTextNode(myArr[i].name);
		row.appendChild(node);
		
		x.appendChild(row);
	}
	
	
}
function redirecting(url){window.location.href = url;}
