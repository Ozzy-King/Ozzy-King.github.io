// The string stores the name of files added till now 
var filesAdded = '';  
  
// For loading JS file 
function loadJS(){  
  
    // Gives -1 when the given input is not in the string 
    // i.e this file has not been added 
      
    if(filesAdded.indexOf('script.js') !== -1) 
        return
          
    // Head tag 
    var head = document.getElementsByTagName('head')[0]  
      
    // Creating script element 
    var script = document.createElement('script')  
    script.src = './JS/test.js'
    script.type = 'text/javascript'
    script.id = 'customJs';
	  
    // Adding script element 
    head.append(script)  
} 
  
// To load CSS file 
function loadCSS() {  
  
    if(filesAdded.indexOf('styles.css') !== -1) 
        return
  
    var head = document.getElementsByTagName('head')[0] 
      
    // Creating link element 
    var style = document.createElement('link')  
    style.href = './CSS/test.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
	style.id = 'customCss';
    head.append(style); 
      
}