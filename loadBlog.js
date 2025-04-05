async function loadBlog(){
	var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	
	var repoResponse = await fetch("blogs.txt"); 
	var blogInfoText = await repoResponse.text();
	blogInfoText = blogInfoText.replaceAll("\n", "");
	console.log(blogInfoText);
	var blogInfoJSON = JSON.parse(blogInfoText);
	console.log(blogInfoJSON);

    var blogCont = document.createElement('div');
    blogCont.id = "blogcontainer";
    contentEle.appendChild(blogCont);

    for(let i = 0; i  < blogInfoJSON.length; i++){
		var row = document.createElement('div');
		row.classList.add("blogItem");

        var thumbLogo = document.createElement('img');
		thumbLogo.src = blogInfoJSON[i].thumb;
		row.appendChild(thumbLogo);

        var title = document.createElement('h3');
		title.innerText = blogInfoJSON[i].title;
		row.appendChild(title);

        var summary = document.createElement('summary');
		summary.innerText = blogInfoJSON[i].summary;
		row.appendChild(summary);

        var created = document.createElement('created');
		created.innerText = "created: "+ blogInfoJSON[i].created;
		row.appendChild(created);
        
        row.onclick = ()=>{ loadBlogContent(blogInfoJSON[i].content); };

        blogCont.appendChild(row);
    }


}

async function loadBlogContent(contentURL){


    var contentEle = document.getElementById("content");
	while (contentEle.firstChild) {
		contentEle.removeChild(contentEle.lastChild);
	}
	
    var content = document.createElement('div');
    content.classList.add("blog");
    contentEle.appendChild(content);

	var repoResponse = await fetch(contentURL); 
	var blogText = await repoResponse.text();
    content.innerHTML = blogText;

}