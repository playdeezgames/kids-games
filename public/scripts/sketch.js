function preload(){
  Game.preload();
}

function setup() {
  Game.setup();
}

function draw() {
  Game.update();
  Game.draw();
}
function keyPressed(){
  Input.handleKeyPress(keyCode);
}
function keyReleased(){
  Input.handleKeyRelease(keyCode);
}
