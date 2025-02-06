

async function JS_PAGE_INIT(){
    var gotData = await fetch('./HTML/BLOG/list.txt');
    var data = await gotData.json();
    console.log(data);
    
    var dispTab = document.getElementById('blogThumbTable');

    var swap = true;

    for(var i = 0; i < data.list.length; i++){
        console.log("./HTML/BLOG/THUMB/"+data.list[i]+"_thumb.html");
        var gotBlogThumb = await fetch("./HTML/BLOG/THUMB/"+data.list[i]+"_thumb.html");
        
        var blogThumb = await gotBlogThumb.text()
        var parser = new DOMParser();
        var doc = parser.parseFromString(blogThumb, 'text/html');

        var blogImg = doc.getElementsByTagName('img')[0];
        var blogText = doc.getElementsByTagName('p')[0];
        var row = document.createElement('tr');

        var imgSide = document.createElement('td');
        imgSide.appendChild(blogImg);

        var textSide = document.createElement('td');
        textSide.appendChild(blogText);

        if(swap){
            row.appendChild(imgSide);
            row.appendChild(textSide);
            swap = false;
        }else{
            row.appendChild(textSide);
            row.appendChild(imgSide);
            swap = true;
        }
        dispTab.appendChild(row);

        let tempData = data.list[i];
        row.addEventListener("click", function() { loadBlog(tempData); } );

        console.log(blogThumb);
    }
}

async function loadBlog(blogname){
    console.log("./HTML/BLOG/"+blogname+".html");
    var gotBlogData = await fetch("./HTML/BLOG/"+blogname+".html");
    var data = await gotBlogData.text();

    var blogContent = document.createElement('div');
    blogContent.id = "blogContent";
    blogContent.innerHTML = data;

    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(blogContent);


}