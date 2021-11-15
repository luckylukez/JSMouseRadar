let mouseAngle;
let newMouseAngle;
let angle;


// Contains x, y, and millis at detection
let dots = [];
const epsilon = 0.015;
const secondsPerLap = 4;

const lineFadeTime = 4;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  angle = getAngle();
  scanLine();
  
  let v;
  push();
  translate(width/2, height/2);
  for(let i = 0; i < 255; i++){
    v = p5.Vector.fromAngle(angleToSpan(angle - i*2*Math.PI/500), width/2);
    let vx = v.x;
    let vy = v.y;
    stroke(color(0,255,0,255-i));
    line(0,0,vx,vy);
  }
  pop();
  drawDots();
}

function getAngle(){
  let ang = ((Math.PI*2*millis()/1000)/secondsPerLap);
  return angleToSpan(ang);
}

function angleToSpan(ang){
  ang = ang%(Math.PI*2);
  if(ang > Math.PI){
    ang = ang - 2*Math.PI; 
  }
  return ang;
}

function scanLine(){
  newMouseAngle = atan2(mouseY - height / 2, mouseX - width / 2);
  if(newMouseAngle < angle+epsilon && mouseAngle > angle-epsilon && !( newMouseAngle < 0 && mouseAngle > 0)){
    dots.push([mouseX, mouseY, millis()]);
  }
  mouseAngle = newMouseAngle;
}

function drawDots(){
  dots.forEach(element => {
    let colorIntensity = (255 - (millis()-element[2])/25);
    fill(color(255,0,0,colorIntensity));
    noStroke();
    circle(element[0], element[1], 15);
  });
}