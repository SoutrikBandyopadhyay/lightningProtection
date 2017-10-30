let count = 1;

function mToPx(d) {
  return d*4;
}

function Mast(x,y,height,label) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.R = 24.753;
  this.label = label;
  this.sliders = {};
}

Mast.prototype.update = function(){
  this.x = this.sliders.x.value();
  this.y = getYCoord(this.sliders.y.value());
}

function distanceMasts(A,B){
  return 0.250*sqrt(pow(A.x-B.x,2)+pow(A.y-B.y,2));
}

Mast.prototype.show = function () {
  push();
  translate(this.x,this.y);
  fill(255,255,255,100);

  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  rect(0,0,mToPx(3.75),mToPx(3.75));
  textSize(24);
  fill(255);
  text(this.label, 10, 30);
  textSize(18);
  fill(255);

  text("(" + this.x.toString() + "," + getYCoord(this.y).toString() + ")", 40, 30);



  pop();
  this.displayCircle(mToPx(this.R));
};

Mast.prototype.displayCircle = function(r){
  push();
  noFill();
  stroke(0,255,0);
  strokeWeight(1);
  translate(this.x,this.y);
  ellipse(0,0,r*2,r*2);

  pop();
}


function getRox(A,B){
  let S = distanceMasts(A,B);
  let h = A.height;
  let hx = 13.8;
  let P = 5.5/sqrt(h);
  // console.log(P);

  let ha = h - (S/(7*P));
  let Rox;
  if(hx > (2*ha)/3 && ha <30){
    Rox = 1.5 * ha * (1 - hx/(0.8*ha));
  }
  if(hx < (2*ha)/3 && ha <30){
    Rox = 0.75 * ha * (1 - hx/ha);
  }
  if(hx > (2*ha)/3 && ha > 30){
    Rox = 1.5 * ha * (1 - hx/(0.8*ha)) * P;
  }
  // console.log(Rox);
  return Rox;
}



function drawLineBetween(A,B,Rox,prefferedX,prefferedY){
  // Rox = Rox || 3.163;

  Rox = getRox(A,B);
  // console.log("[",A.label,",",B.label,"] ",Rox);
  line(A.x,A.y,B.x,B.y);
  drawInterpolation(A,B,mToPx(Rox),prefferedX,prefferedY);


  push();
  translate((A.x+B.x)/2,(A.y+B.y)/2);
  textSize(20);
  fill(255);

  text(distanceMasts(A,B).toFixed(2).toString() + " m",-20,0);
  pop();



}

function getYCoord(y){
  return height-y;
}

function lineEquation(x,y,A,B){
  x1 = A.x;
  y1 = A.y;
  x2 = B.x;
  y2 = B.y;
  let m = (y2-y1)/(x2-x1);
  return ((y-y2) - (x-x2)*m);
}


function getRwalaPoint(A,B,Ro,prefferedX,prefferedY){
  let x1 = A.x;
  let y1 = getYCoord(A.y);
  let x2 = B.x;
  let y2 = getYCoord(B.y);
  r = Ro || 24.753;

  let a = (x1+x2)/2;
  let b = (y1+y2)/2;

  let m = (x1-x2)/(y2-y1);

  let Rx1 = a + (Ro/sqrt(1+pow(m,2)));
  let Rx2 = a - (Ro/sqrt(1+pow(m,2)));
  if(m === Infinity){
    Ry1 = b+Ro;
    Ry2 = b-Ro;

  }else{
    Ry1 = m*(Rx1-a) + b;
    Ry2 = m*(Rx2-a) + b;
  }
  if(lineEquation(Rx1,getYCoord(Ry1),A,B)*lineEquation(prefferedX,prefferedY,A,B)>0){
    return {Rx:Rx1,Ry:Ry1};
  }else{
    return {Rx:Rx2,Ry:Ry2};
  }
}
function getDist(x1,y1,x2,y2){
  return sqrt(pow(x1-x2,2)+pow(y1-y2,2));
}

function circleEquation(cat,A){

  let x2 = A.x;
  let y2 = getYCoord(A.y);
  let r = mToPx(A.R);
  let x = cat.x;
  let y = cat.y;

  return getDist(x,y,x2,y2) - r;
}

function getTangentPoint(R,A,B,prefferedX,prefferedY){
  let x1 = R.Rx ;
  let y1 = R.Ry;
  let x2 = A.x;
  let y2 = getYCoord(A.y);
  let r = mToPx(A.R);

  let distanceBetweenThose = sqrt(pow(x1-x2,2) + pow(y1-y2,2));
  let d = sqrt(pow(distanceBetweenThose,2) - pow(r,2));

  let E = pow(x2-x1,2) - r*r;
  let X = 2 * (x2-x1) * (y2-y1);
  let C = pow(y2-y1,2) - r*r

  let m1;
  let m2;

  m1 = (X + sqrt(pow(X,2) - 4*E*C))/(2*E);
  m2 = (X - sqrt(pow(X,2) - 4*E*C))/(2*E);

  let ans1 = {};
  let ans2 = {};
  let ans3 = {};
  let ans4 = {};

  ans1.x = R.Rx + d*cos(atan(m1));
  ans1.y = R.Ry + d*sin(atan(m1));

  ans2.x = R.Rx + d*cos(atan(m2));
  ans2.y = R.Ry + d*sin(atan(m2));


  ans3.x = R.Rx - d*cos(atan(m1));
  ans3.y = R.Ry - d*sin(atan(m1));

  ans4.x = R.Rx - d*cos(atan(m2));
  ans4.y = R.Ry - d*sin(atan(m2));

  if(circleEquation(ans1,A) < circleEquation(ans3,A)){
    possibility1 = ans1;
  }else{
    possibility1 = ans3;
  }

  if(circleEquation(ans2,A) < circleEquation(ans4,A)){
    possibility2 = ans2;
  }else{
    possibility2 = ans4;
  }


  push();
  strokeWeight(1);
  stroke(0,0,255);

  if(count%2 == 1){
    stroke(0,255,0);
    line(R.Rx,getYCoord(R.Ry),possibility2.x,getYCoord(possibility2.y));
  }else{
    stroke(0,255,0);
    line(R.Rx,getYCoord(R.Ry),possibility1.x,getYCoord(possibility1.y));
  }

  count = count + 1;
  pop();
}


function drawTangents(R,A,B,prefferedX,prefferedY){
  push();
  stroke(0,255,0);
  strokeWeight(1);
  stroke(0,0,255);
  pop();
  getTangentPoint(R,A,B,prefferedX,prefferedY)
  getTangentPoint(R,B,A,prefferedX,prefferedY)
}

function drawInterpolation(A,B,r,prefferedX,prefferedY){
  let x1 = A.x;
  let y1 = A.y;
  let x2 = B.x;
  let y2 = B.y;
  r = r || 24.753;

  R = getRwalaPoint(A,B,r,prefferedX,prefferedY)
  push();
  translate(R.Rx,getYCoord(R.Ry));
  fill(255,0,0);
  ellipse(0,0,3,3);
  pop();
  drawTangents(R,A,B,prefferedX,prefferedY);
}
