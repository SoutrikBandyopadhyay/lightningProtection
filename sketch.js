let boundary = new Boundary();
let masts = new Array();


//Sir Er Case ta
masts[0] = new Mast(206,202,35,1);
masts[1] = new Mast(495,182,35,2);
masts[2] = new Mast(585,615,35,3);
masts[3] = new Mast(185,615,35,4);

//Possibility
// masts[0] = new Mast(208,800 - 598,35,1);
// masts[1] = new Mast(495,800 - 622,35,2);
// masts[2] = new Mast(585,800 -191,35,3);
// masts[3] = new Mast(185,800 - 187,35,4);

// Possibility 2
// masts[0] = new Mast(206,800 - 653,35,1);
// masts[1] = new Mast(477,800 - 668,35,2);
// masts[2] = new Mast(595,800 -167,35,3);
// masts[3] = new Mast(181,800 - 134,35,4);

//Final Values
// masts[0] = new Mast(199,800 - 672,35,1);
// masts[1] = new Mast(472,800 - 671,35,2);
// masts[2] = new Mast(610,800 -177,35,3);
// masts[3] = new Mast(191,800 - 103,35,4);


//Final 2
// masts[0] = new Mast(199,800 - 663,35,1);
// masts[1] = new Mast(472,800 - 671,35,2);
// masts[2] = new Mast(610,800 -177,35,3);
// masts[3] = new Mast(191,800 - 112,35,4);

//Test Case
// masts[0] = new Mast(206,800 - 598,35,1);
// masts[1] = new Mast(495,800 - 618,35,2);
// masts[2] = new Mast(585,800 -185,35,3);
// masts[3] = new Mast(185,800 - 185,35,4);





function setup() {
  createCanvas(920,800);

  masts[0].sliders.x = createSlider(0,width,masts[0].x,1);
  masts[1].sliders.x = createSlider(0,width,masts[1].x,1);
  masts[2].sliders.x = createSlider(0,width,masts[2].x,1);
  masts[3].sliders.x = createSlider(0,width,masts[3].x,1);
  masts[0].sliders.y = createSlider(0,height,getYCoord(masts[0].y),1);
  masts[1].sliders.y = createSlider(0,height,getYCoord(masts[1].y),1);
  masts[2].sliders.y = createSlider(0,height,getYCoord(masts[2].y),1);
  masts[3].sliders.y = createSlider(0,height,getYCoord(masts[3].y),1);
  select("#mast1").child(masts[0].sliders.x);
  select("#mast1").child(masts[0].sliders.y);
  select("#mast2").child(masts[1].sliders.x);
  select("#mast2").child(masts[1].sliders.y);
  select("#mast3").child(masts[2].sliders.x);
  select("#mast3").child(masts[2].sliders.y);
  select("#mast4").child(masts[3].sliders.x);
  select("#mast4").child(masts[3].sliders.y);

}

function draw() {
  background(0);
  for(let i =0; i<4;i++){
    masts[i].update();
  }
  boundary.show();
  for(let i = 0; i<masts.length;i++) {
    masts[i].show();
  }
  stroke(255);
  strokeWeight(3);
  line(0,0,0,height);
  line(0,height,width,height);


  stroke(255);
  strokeWeight(0.2);


  drawLineBetween(masts[0],masts[1],7.605,width/2,0);
  drawLineBetween(masts[1],masts[2],1.265,width,height/2);
  drawLineBetween(masts[2],masts[3],8.745,width/2,height);
  drawLineBetween(masts[3],masts[0],2.887,0,height/2);

  line(masts[3].x,masts[3].y,masts[1].x,masts[1].y);
  push();
  translate((masts[3].x+masts[1].x)/2,(masts[3].y+masts[1].y)/2);
  textSize(20);
  fill(255);

  text(distanceMasts(masts[3],masts[1]).toFixed(2).toString() + " m",-20,0);
  pop();


  let gridSize = 40;
  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255,255,255,100);
      rect(x-1, y-1, 1, 1);

    }
  }


}
