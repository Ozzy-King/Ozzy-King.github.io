

//once loaded run function
window.onload = async function(){
	OnloadFunc();
	
	let response = await fetch("https://api.github.com/users/myles-rockland/repos"); 
	let json = await response.text();
	let myArr = JSON.parse(json);
	console.log(myArr.length);
	let x = document.getElementsByClassName("mainTable")[0];
	
	for(let i = 0; i < myArr.length; i++){
		let row = document.createElement("tr");
		row.setAttribute("onclick","redirecting('"+myArr[i].html_url+"');");
		
		//adds the name
		let col = document.createElement("td");
		let node = document.createTextNode(myArr[i].name);
		col.appendChild(node);
		col.classList.add("beg");
		row.appendChild(col);
		
		//adds the description
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].description);
		col.appendChild(node);
		row.appendChild(col);
		
		//add lauguages
		
		response = await fetch(myArr[i].languages_url); //fetch list of languages
		json = await response.text();
		var langArr = JSON.parse(json);
		langArr = Object.keys(langArr);
		
		col = document.createElement("td");//create table data
		let list = document.createElement("ul");//create uordered list
		for(let i = 0; i < langArr.length; i++){ //loop thouhg language names
			let listItem = document.createElement("li");//crate list item
			let node = document.createTextNode(langArr[i]);//give list items lang name
			listItem.appendChild(node);
			list.appendChild(listItem);//add list item to list
		}
		col.appendChild(list);//apend list to table data
		row.appendChild(col);//append table data
		
		//add number of forks
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].forks_count);
		col.appendChild(node);
		row.appendChild(col);
		
		//add number of last push
		col = document.createElement("td");
		node = document.createTextNode(myArr[i].pushed_at.replace("T", " ").substring(0, myArr[i].pushed_at.length-1));
		col.appendChild(node);
		col.classList.add("end");
		row.appendChild(col);
		
		x.appendChild(row);
	}
	
	
}	

function redirecting(url){window.location.href = url;}