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
        history.pushState({ page: filename }, "New Page Title", rootUrl);
    }
}



//most of the site navigation stuff


// Store the original pushState method
const originalPushState = history.pushState;

// Create a custom pushState function
history.pushState = function(state, title, url) {
  // Call the original pushState method
  originalPushState.apply(history, arguments);

  // Dispatch a custom event after pushState is called
  const event = new CustomEvent('pushstate', {
    detail: { state, title, url }
  });
  window.dispatchEvent(event);
};

async function loadPageOnEvent(event){
    // Handle the state change and update the page content
    await loadPage(event.state.page, true);
    if(event.state.blog){
        await loadBlog(event.state.blog, true);
    }
}

window.addEventListener('popstate', async function(event) {
    await loadPageOnEvent(event);
});
window.addEventListener('pushstate', async function(event) {
    // Handle the state change and update the page content
    updateCookie("currentState", JSON.stringify(event.detail));
    console.log( event.detail);
});

window.addEventListener('unload', function () {
    window.location.href = rootUrl + "index.html";
});