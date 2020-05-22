const TOTAL_ROUNDS = 20;
const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;
const GRID_COLUMNS=10;
const GRID_ROWS = 6;
const DISPLAY_WIDTH = IMAGE_WIDTH*GRID_COLUMNS;
const DISPLAY_HEIGHT = IMAGE_HEIGHT*GRID_ROWS;
let gameState = {};
function randomRange(minimum, maximum){
    return Math.floor(Math.random()*(maximum-minimum+1))+minimum;
}
function giveAnswer(answer){
    if(gameState.answerGiven){
        return;
    }
    gameState.answerGiven=true;;
    if(answer==gameState.currentProblem){
        gameState.roundsCorrect++;
        document.getElementById("result").innerHTML=`<img src="./confirmed.png"/>`;
        setTimeout(()=>{
            nextProblem();
        },2000);
    }else{
        gameState.badGuesses++;
        document.getElementById("result").innerHTML=`<img src="./cancel.png"/>`;
        setTimeout(()=>{
            document.getElementById("result").innerHTML="";
            gameState.answerGiven=false;
        },2000);
    }
}
function showProblem(){
    let content = "";
    content+=`<p>#${gameState.totalRounds-gameState.roundsLeft} of ${gameState.totalRounds}</p><hr/>`;
    content+=`<p><canvas id="display" width="${DISPLAY_WIDTH}" height="${DISPLAY_HEIGHT}"></canvas>`;
    content+="</p><hr/>";
    content+="<p>"
    for(let index=gameState.minimum;index<=gameState.maximum;++index){
        content+=`<button onclick="giveAnswer(${index})"><h3> ${index} </h3></button> `;
    }
    content+=`</p>`;
    content+=`<p><span id="result"></span></p>`;
    setContent(content);
    let context = document.getElementById("display").getContext("2d");
    let grid = [];
    while(grid.length<GRID_COLUMNS){
        let column=[];
        while(column.length<GRID_ROWS){
            column.push(false);
        }
        grid.push(column);
    }
    for(let index=0;index<gameState.currentProblem;++index){
        let x;
        let y;
        do{
            x = randomRange(0,GRID_COLUMNS-1);
            y = randomRange(0,GRID_ROWS-1);
        }while(grid[x][y]);
        grid[x][y]=true;
        context.drawImage(gameState.image,x*IMAGE_WIDTH,y*IMAGE_HEIGHT);
    }
}
function gameOver(){
    let content="";
    content+="<h1>All done!</h1>";
    content+=`<p>Rounds: ${gameState.roundsCorrect}</p>`;
    content+=`<p>Wrong Guesses: ${gameState.badGuesses}</p>`;
    setContent(content);
}
function nextProblem(){
    if(gameState.roundsLeft<=0){
        gameOver();
        return;
    }
    let newProblem;
    do{
        newProblem = Math.floor(Math.random()*(gameState.maximum-gameState.minimum+1))+gameState.minimum;
    }while(newProblem==gameState.currentProblem);
    gameState.currentProblem = newProblem;
    gameState.answerGiven = false;
    gameState.roundsLeft--;
    showProblem();
}
function startGame(whichImage){
    gameState.whichImage = whichImage;
    gameState.maximum = 10;
    gameState.minimum = 1;
    gameState.roundsLeft = TOTAL_ROUNDS;
    gameState.totalRounds = TOTAL_ROUNDS;
    gameState.roundsCorrect = 0;
    gameState.badGuesses = 0;
    gameState.image = new Image();
    gameState.image.onload = ()=>{nextProblem();};
    gameState.image.src=whichImage;
    
}
function setContent(content){
    document.body.innerHTML=content;
}
function main(){
    let content = "";
    content+=`<p><button><img src="./unicorn.png" onclick="startGame('./unicorn.png')"/></button><button><img src="./ghost.png"/ onclick="startGame('./ghost.png')"></button></p>`;
    setContent(content);
}