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
const shakeThreshHold = 5;

let maxTime = 60 * 30;
let curTime = 0;

let error = false;
let errorMessage = "";

let currentAction = 0;

function isAction(actIndex){
	return actionList[actIndex];
}
function setAction(actIndex, state){
	actionList[actIndex] = state
}

//sets next action and shows the right instruction
function nextAction(){
	curTime = 0;
	maxTime = Math.max(maxTime - 10, 60);//reduce time to complete by ten reduces till 1 second
	var nextAction = getRandomInt(3);
	actionList[nextAction] = true;
	actionListInstEle[currentAction].classList.add("hidden");
	currentAction = nextAction;
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
		errorMessage += "absoluteOrientationSensor not avaliable : ";
		return;
	}
	
	sensor.addEventListener('reading', () => {
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
		errorMessage += "absoluteOrientationSensor not avaliable : ";
		return;
	}
	
	let highShake = 0;
	let lowShake = 0;

	laSensor.addEventListener("reading", () => {
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
  spinCheck();
  shakeCheck();
  
  actionListInstEle.push(document.getElementById('spinInst'));
  actionListInstEle.push(document.getElementById('shakeUpDownInst'));
  actionListInstEle.push(document.getElementById('shakeLeftRightInst'));
  
  if(!error){
	nextAction();
	document.getElementById('inst').innerText = '';
  }else{
	document.getElementById('inst').innerText = errorMessage;
  }
  
}