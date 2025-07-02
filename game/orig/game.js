function quaternionToEuler(q) {
	const [x, y, z, w] = q;
	const sinr = 2 * (w * x + y * z);
	const cosr = 1 - 2 * (x * x + y * y);
	const roll = Math.atan2(sinr, cosr);
	
	const sinp = 2 * (w * y - z * x);
	const pitch = Math.abs(sinp) >= 1 ? Math.sign(sinp) * Math.PI / 2 : Math.asin(sinp);
	
	const siny = 2 * (w * z + x * y);
	const cosy = 1 - 2 * (y * y + z * z);
	const yaw = Math.atan2(siny, cosy);
	
	return {
	yaw: yaw * (180 / Math.PI),
	pitch: pitch * (180 / Math.PI),
	roll: roll * (180 / Math.PI)
	};
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

let actionList = [false, false, false]; // [spin, shake]
let actionListInstEle = [];

// Then instead of spin/shake vars, always do:
const spin = 0;
const shakeUpDown = 1;
const shakeLeftRight = 2;
const shakeThreshHold = 6;

let maxTime = 60 * 10;
let curTime = 0;

let score = -1;

let error = false;
let errorMessage = "";

let currentAction = 0;



function isAction(actIndex){
	if(currentAction == -1){ return false; }
	return actionList[actIndex];
}
function setAction(actIndex, state){
	actionList[actIndex] = state
}

//sets next action and shows the right instruction
function nextAction(){
	score += 1;
	curTime = 0;
	maxTime = Math.max(maxTime - 10, 60);//reduce time to complete by ten reduces till 1 second
	var nextAction = getRandomInt(3);//get new instruction that different from the last
	while(nextAction == currentAction){
		nextAction = getRandomInt(3);
	}
	
	if(currentAction != -1){//reset last instuction if possible
		actionList[currentAction] = false;
		actionListInstEle[currentAction].classList.add("hidden");
	}
	
	currentAction = nextAction;	
	actionList[nextAction] = true;
	actionListInstEle[currentAction].classList.remove("hidden");
}

function spinCheck() {
	let t = 0;
	let lastYaw = 0;
	let sensor;
	try{
		sensor = new AbsoluteOrientationSensor({ frequency: 60 });
	}
	catch{
		error = true;
		errorMessage += "\nAbsoluteOrientationSensor not avaliable : ";
		return;
	}
	
	sensor.addEventListener('reading', () => {
		if(curTime > maxTime){ stop(); return; }
		
		if(isAction(spin)){
		
			const euler = quaternionToEuler(sensor.quaternion);
		
			let delta = euler.yaw - lastYaw;
			delta = ((delta + 540) % 360) - 180;
			t += delta;
			lastYaw = euler.yaw;
		
			if (Math.abs(t) >= 360) {
				t = 0; // Reset after spin
				setAction(spin, false);
				nextAction();
			}
			curTime += 1;
		}
	});
	
	sensor.start();
}

function shakeCheck() {
	let laSensor;
	try{
		laSensor = new LinearAccelerationSensor({ frequency: 60 });
	}catch{
		error = true;
		errorMessage += "\nLinearAccelerationSensor not avaliable : ";
		return;
	}
	
	let highShake = 0;
	let lowShake = 0;

	laSensor.addEventListener("reading", () => {
		if(curTime > maxTime){ stop(); return; }
		
		if(isAction(shakeUpDown)){
			//get the values
			highShake = Math.max(highShake, laSensor.y);
			lowShake = Math.min(lowShake, laSensor.y);
		
			// Detect strong shake on X axis
			if (highShake >= shakeThreshHold && lowShake <= -shakeThreshHold) {
				highShake = 0; lowShake = 0;
				setAction(shakeUpDown, false);
				nextAction();
			}
			curTime += 1;
		}
		if(isAction(shakeLeftRight)){
			//get the values
			highShake = Math.max(highShake, laSensor.x);
			lowShake = Math.min(lowShake, laSensor.x);
		
			// Detect strong shake on X axis
			if (highShake >= shakeThreshHold && lowShake <= -shakeThreshHold) {
				highShake = 0; lowShake = 0;
				setAction(shakeLeftRight, false);
				nextAction();
			}
			curTime += 1;
		}
	});

  laSensor.start();
}

function start() {
	//set sensors with logic
	spinCheck();
	shakeCheck();
	
	//create array with inst images
	actionListInstEle.push(document.getElementById('spinInst'));
	actionListInstEle.push(document.getElementById('shakeUpDownInst'));
	actionListInstEle.push(document.getElementById('shakeLeftRightInst'));

	if(error){
		document.getElementById('playInst').classList.add("hidden");
		document.getElementById('inst').innerText = errorMessage;
		return;
	}
	showScores();
}

function play(){
	if(error){ return; }//if error dont play
	//global reset
	score = -1;
	curTime = 0;
	maxTime = 60 * 10;
	inStop = 0;
	
	//start
	document.getElementById('playInst').classList.add("hidden");		
	nextAction();
	document.getElementById('inst').innerText = '';
}

let inStop = 0;
function stop(){
	if(inStop == 1){ return;}
	inStop = 1;
	
	actionListInstEle[currentAction].classList.add("hidden");//hide current
	document.getElementById('playInst').classList.remove("hidden");//show play button
	showScores();//show score
	


	actionList[currentAction] = false;//set curetn action to false
	currentAction = -1;//set current action to nothing
	score = -1;//reset score
	curTime = 0;//reset curretn time
	maxTime = 60 * 10;//restet maxtime
	


	return;
}

function setScore(score){
	var score1 = getCookie("score1");
	var score2 = getCookie("score2");
	var score3 = getCookie("score3");
	if(score > score1){
		setCookie("score1", score, 30);
	}
	else if(score > score2){
		setCookie("score2", score, 30);
	}
	else if(score > score3){
		setCookie("score3", score, 30);
	}
}
function showScores(){
	var score1 = getCookie("score1");
	var score2 = getCookie("score2");
	var score3 = getCookie("score3");

	document.getElementById('inst').innerText = "Scores\n"
											  + "1st: " + score1 + "\n"
											  + "2nd: " + score2 + "\n"
											  + "3rd: " + score3 + "\n";//show score
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

