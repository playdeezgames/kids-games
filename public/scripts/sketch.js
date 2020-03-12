let img;
function preload(){
  img = loadImage('assets/images/meeple.png');
}

function setup() {
  createCanvas(800, 600);
  background(192,192,192);
  image(img,0,0);
}

function draw() {
}
