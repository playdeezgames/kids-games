let imgs = {};
let tiles = convertToLevel([
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
]);

function preload(){
  imgs.meeple = loadImage('assets/images/meeple.png');
  imgs.brick = loadImage('assets/images/brick-wall.png');
}

function setup() {
  createCanvas(960, 640);
  background(192,192,192);
}

function draw() {
  background("#AAAAAA");
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
function convertToLevel(lines){
  let level = [];
  for(let row in lines){
    let line = lines[row];
    let levelRow = [];
    level.push(levelRow);
  }
  return level;
}
