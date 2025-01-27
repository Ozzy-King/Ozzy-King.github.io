var blogList;

//once loaded run function
window.onload = async function(){
	OnloadFunc();
	await getBlogList();
	insertBlogList();
}

async function getBlogList(){
	const response = await fetch("blogList.txt");
    blogList = await response.json();  // Parse the JSON response
    console.log(blogList);  // Logs the { "list": [ <folder names> ] }
}

function insertBlogList(){
	var path = window.location.href.replace("index.html", "");
	for(var i = 0; i < blogList.list.length; i++){
		console.log(path + blogList.list[i]);
	}
	
}




