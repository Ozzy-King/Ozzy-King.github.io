

async function JS_PAGE_INIT(){
    var gotData = await fetch('./HTML/BLOG/list.txt');
    var data = await gotData.json();
    console.log(data);
    
    var dispTab = document.getElementById('blogThumbTable');

    var swap = true;

    var dataObj = await fetchAndSortBlogData(data);

    for(var i = 0; i < dataObj.length; i++){
        //creat he table row
        var row = document.createElement('tr');
        //set up iamge side
        var imgSide = document.createElement('td');
        imgSide.appendChild(dataObj[i].image);
        //setup text side
        var textSide = document.createElement('td');

        var titleTextSide = document.createElement('h2');
        titleTextSide.innerText = dataObj[i].title;
        titleTextSide.classList += "centre";
        textSide.appendChild(titleTextSide);

        textSide.appendChild(dataObj[i].text);

        var dateTextSide = document.createElement('p');
        dateTextSide.innerText = "Created: "+dataObj[i].date;
        textSide.appendChild(dateTextSide);

        if(swap){
            imgSide.classList += "beg";
            row.appendChild(imgSide);
            textSide.classList += "end";
            row.appendChild(textSide);
            swap = false;
        }else{
            textSide.classList += "beg";
            row.appendChild(textSide);
            imgSide.classList += "end";
            row.appendChild(imgSide);
            swap = true;
        }
        dispTab.appendChild(row);

        let tempData = dataObj[i].title;
        row.addEventListener("click", function() { loadBlog(tempData); } );
    }
}

async function loadBlog(blogname, popping = false){
    console.log("./HTML/BLOG/"+blogname+".html");
    var gotBlogData = await fetch("./HTML/BLOG/"+blogname+".html");
    var data = await gotBlogData.text();

    var blogContent = document.createElement('div');
    blogContent.id = "blogContent";
    blogContent.innerHTML = data;

    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(blogContent);
    if(!popping){
        history.pushState({ page: currentPage, blog: blogname }, "New Page Title", rootUrl);
    }
}

async function fetchAndSortBlogData(data){
    var holder = [];
    //get data
    for(var i = 0; i < data.list.length; i++){
        var tempOBJ = {};
        console.log("./HTML/BLOG/THUMB/"+data.list[i]+"_thumb.html");
        var gotBlogThumb = await fetch("./HTML/BLOG/THUMB/"+data.list[i]+"_thumb.html");
        var blogThumb = await gotBlogThumb.text()
        var parser = new DOMParser();
        var doc = parser.parseFromString(blogThumb, 'text/html');

        tempOBJ["image"] = doc.getElementsByTagName('img')[0];
        tempOBJ["text"] = doc.getElementsByTagName('p')[0];
            tempOBJ["text"].classList += "centre";
        tempOBJ["date"] = doc.getElementsByTagName('date')[0].innerText;
        tempOBJ["title"] = data.list[i];
        holder.push(tempOBJ);
    }
    function parseDate(dateStr) {
        var parts = dateStr.split('/'); // Assuming the date format is day/month/year
        return new Date(parts[1] + '/' + parts[0] + '/' + parts[2]); // Convert to month/day/year
    }

    //sort data
    function sortFunction(a,b){  
        var dateA = parseDate(a.date).getTime();
        var dateB = parseDate(b.date).getTime();
        return dateB-dateA;  
    }; 
    holder.sort(sortFunction);
    console.log(holder);
    return holder;
}