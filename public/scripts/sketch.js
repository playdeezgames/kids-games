let imgs = {};
let tiles = [
  "####################",
  "#@.................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "#..................#",
  "####################"
];

function preload(){
  imgs.meeple = loadImage('assets/images/meeple.png');
  imgs.brick = loadImage('assets/images/brick-wall.png');
}

function setup() {
  createCanvas(960, 640);
  background(192,192,192);
}

function draw() {
  clear();
  for(let y in tiles){
    let line = tiles[y];
    for(let x = 0; x< line.length; ++x){
      let px = x * 32;
      let py = y * 32;
      let c = line.charAt(x);
      if(c=='#'){
        image(imgs.brick,px,py);
      }else if(c=='@'){
        image(imgs.meeple,px,py);
      }
    }
  }
}
