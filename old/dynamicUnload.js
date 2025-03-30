// The string stores the name of files added till now 
var filesAdded = '';  
  
  
function unloadPage(){
	unloadHTML();
	unloadCSS();
	unloadJS();
	window.JS_PAGE_INIT = function() {
		console.log("This function has been disabled.");
	};
}
  
// For loading JS file 
function unloadJS(){  
    // Head tag 
    var head = document.getElementById('customJs');
	if(head !== null){
		head.remove();
	}
} 
  
// To load CSS file 
function unloadCSS() {  
  
    var head = document.getElementById('customCss');
	if(head !== null){
		head.remove();
	}
}

function unloadHTML() {  
	let parent = document.getElementById("content");
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}