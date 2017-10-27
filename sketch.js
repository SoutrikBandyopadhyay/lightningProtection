let boundary = new Boundary();
let masts = new Array();

masts[0] = new Mast(206,202,10,1);
masts[1] = new Mast(495,182,10,2);
masts[2] = new Mast(585,615,10,3);
masts[3] = new Mast(185,615,10,4);


function setup() {
  createCanvas(920,800);
  masts[0].sliders.x = createSlider(0,width,206,1);
  masts[1].sliders.x = createSlider(0,width,495,1);
  masts[2].sliders.x = createSlider(0,width,585,1);
  masts[3].sliders.x = createSlider(0,width,185,1);
  masts[0].sliders.y = createSlider(0,height,getYCoord(202),1);
  masts[1].sliders.y = createSlider(0,height,getYCoord(182),1);
  masts[2].sliders.y = createSlider(0,height,getYCoord(615),1);
  masts[3].sliders.y = createSlider(0,height,getYCoord(615),1);
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
  strokeWeight(0.2);

  drawLineBetween(masts[0],masts[1],width/2,0);
  drawLineBetween(masts[1],masts[2],width,height/2);
  drawLineBetween(masts[2],masts[3],width/2,height);
  drawLineBetween(masts[3],masts[0],0,height/2);

  line(masts[3].x,masts[3].y,masts[1].x,masts[1].y);

  let gridSize = 40;
  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255,255,255,100);
      rect(x-1, y-1, 1, 1);

    }
  }


}
