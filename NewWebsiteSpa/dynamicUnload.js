// The string stores the name of files added till now 
var filesAdded = '';  
  
// For loading JS file 
function unloadJS(){  
    // Head tag 
    var head = document.getElementById('customJs');
	head.remove();
} 
  
// To load CSS file 
function unloadCSS() {  
  
    var head = document.getElementById('customCss');
	head.remove();
}