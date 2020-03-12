function setup() {
  noCanvas();
  let btn = createButton('Push Me!');
  btn.mousePressed(buttonPress);
}

function draw() {
}

function buttonPress(){
  window.open("https://www.google.com");
}
