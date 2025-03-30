
//once loaded run function
async function JS_PAGE_INIT(){
	await newSearch();
}


async function newSearch(){
	let searchBoxEle = document.getElementById("searchUserBox");
	var UsersName = "ozzy-king";

	var response = await fetch("https://api.github.com/users/"+UsersName+"/repos"); 
	var json = await response.text();
	var myArr = JSON.parse(json);
	console.log(myArr.length);
	var x = document.getElementsByClassName("devTable")[0];
	while (x.childElementCount != 1) {
		x.removeChild(x.lastChild);
	}
	
	
	for(let i = 0; i < myArr.length; i++){
		let row = document.createElement("tr");
		if(myArr[i].has_pages){
			row.setAttribute("onclick", "redirecting('https://"+UsersName+".github.io/"+myArr[i].name+"/')");
		}
		else{
			row.setAttribute("onclick", "redirecting('"+myArr[i].html_url+"');");
		}

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

		//add primary language to list
		col = document.createElement("td");//create table data
		node = document.createTextNode(myArr[i].language)
		col.appendChild(node);//apend list to table data
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
