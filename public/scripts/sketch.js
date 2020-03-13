function preload(){
  Game.preload();
}

function setup() {
  Game.setup();
}

function draw() {
  Game.update();
  Input.clear();
  Game.draw();
}
function keyPressed(){
  print(keyCode);
  Input.handleKeyPress(keyCode);
}
