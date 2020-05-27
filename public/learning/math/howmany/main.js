const TOTAL_ROUNDS = 10;
let gameState = {};
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
    content+="<p>";
    for(let index=0;index<gameState.currentProblem;++index){
        content+=`<img src="${gameState.whichImage}"/>`
    }
    content+="</p><hr/>";
    content+="<p>"
    for(let index=gameState.minimum;index<=gameState.maximum;++index){
        content+=`<button onclick="giveAnswer(${index})"><h3> ${index} </h3></button> `;
    }
    content+=`</p>`;
    content+=`<p><span id="result"></span></p>`;
    setContent(content);
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
    gameState.maximum = 20;
    gameState.minimum = 1;
    gameState.roundsLeft = TOTAL_ROUNDS;
    gameState.totalRounds = TOTAL_ROUNDS;
    gameState.roundsCorrect = 0;
    gameState.badGuesses = 0;
    nextProblem();
}
function setContent(content){
    document.body.innerHTML=content;
}
function main(){
    let content = "";
    content+=`<p><button><img src="./unicorn.png" onclick="startGame('./unicorn.png')"/></button><button><img src="./ghost.png"/ onclick="startGame('./ghost.png')"></button></p>`;
    setContent(content);
}