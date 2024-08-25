

//once loaded run function
window.onload = async function(){
	OnloadFunc();
	
	const response = await fetch("https://api.github.com/users/Ozzy-King/repos"); 
	const json = await response.text();
	const myArr = JSON.parse(json);
	console.log(myArr.length);
	const x = document.getElementsByClassName("mainTable")[0];
	
	for(var i = 0; i < myArr.length; i++){
		var row = document.createElement("tr");
		row.setAttribute("onclick","redirecting('"+myArr[i].html_url+"');");
		
		//adds the name
		var col = document.createElement("td");
		var node = document.createTextNode(myArr[i].name);
		col.appendChild(node);
		row.appendChild(col);
		
		//adds the description
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].description);
		col.appendChild(node);
		row.appendChild(col);
		
		//add lauguages
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].language);
		col.appendChild(node);
		row.appendChild(col);
		
		//add number of forks
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].forks_count);
		col.appendChild(node);
		row.appendChild(col);
		
		//add number of last push
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].pushed_at.replace("T", " ").substring(0, myArr[i].pushed_at.length-1));
		col.appendChild(node);
		row.appendChild(col);
		
		x.appendChild(row);
	}
	
	
}	

function redirecting(url){window.location.href = url;}