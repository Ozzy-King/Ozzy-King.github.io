// The string stores the name of files added till now 
var filesAdded = '';  
var currentPage="homePage";
var rootUrl = "";  

function setRootURL(){
    rootUrl = window.location.href.replace("index.html", ""); 
}

async function loadPage(pageName, popping = false){
    console.log(currentPage);
    document.getElementById(currentPage).classList.remove("currentPage");
    currentPage = pageName;
    document.getElementById(currentPage).classList.add("currentPage");
	unloadPage();
	await loadCSS(pageName);
	await loadJS(pageName);
	await loadHTML(pageName, popping);
	JS_PAGE_INIT();//function foundin loaded javascripts to init them them
}
  
  
// For loading JS file 
function loadJS(filename){  
  
    var filePath = './JS/'+filename+'.js';
    var head = document.getElementsByTagName('head')[0]  
      
    // Creating script element 
    var script = document.createElement('script')  
    script.src = filePath
    script.type = 'text/javascript'
    script.id = 'customJs';
	  
    // Adding script element 
    head.append(script)  
} 
  
// To load CSS file 
function loadCSS(filename) {  
	var filePath = './CSS/'+filename+'.css';
  
    var head = document.getElementsByTagName('head')[0] 
      
    // Creating link element 
    var style = document.createElement('link')  
    style.href = filePath;
    style.type = 'text/css'
    style.rel = 'stylesheet'
	style.id = 'customCss';
    head.append(style); 
      
}

// To load CSS file 
async function loadHTML(filename, popping) {  
	
    if(filesAdded.indexOf(filename+'.html') !== -1) 
        return
	var filePath = './HTML/'+filename+'.html';
    console.log(filePath);
    var gotData = await fetch(filePath);
	var data = await gotData.text();
    document.getElementById("content").innerHTML = data;
    if(!popping){
        history.pushState({ page: filename }, "New Page Title", rootUrl+filename);
    }
}

window.addEventListener('popstate', async function(event) {
    // Handle the state change and update the page content
    await loadPage(event.state.page, true);
    if(event.state.blog){
        await loadBlog(event.state.blog, true);
    }
    console.log("State changed:", event.state);
  });