const TOTAL_ROUNDS = 20;
let gameState = {};
function randomRange(minimum, maximum){
    return Math.floor(Math.random()*(maximum-minimum+1))+minimum;
}
function giveAnswer(answer){
    if(gameState.answerGiven){
        return;
    }
    gameState.answerGiven=true;
    if(answer==gameState.currentProblem.sum){
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
    content+=`<h1>${gameState.currentProblem.first} + ${gameState.currentProblem.second} = ??</h1><hr/>`;
    content+="<p>"
    for(let index=gameState.minimum + gameState.minimum;index<=gameState.maximum + gameState.maximum;++index){
        content+=`<button onclick="giveAnswer(${index})"><h3> ${index} </h3></button> `;
    }
    content+=`</p><span id="result"></span><p></p>`;
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
        newProblem = {
            first:randomRange(gameState.minimum,gameState.maximum),
            second:randomRange(gameState.minimum,gameState.maximum)
        }
    }while(newProblem.first==gameState.currentProblem.first && newProblem.second==gameState.currentProblem.second);
    newProblem.sum = newProblem.first + newProblem.second;
    gameState.currentProblem = newProblem;
    gameState.answerGiven = false;
    gameState.roundsLeft--;
    showProblem();
}
function startGame(){
    gameState.maximum = 10;
    gameState.minimum = 0;
    gameState.roundsLeft = TOTAL_ROUNDS;
    gameState.totalRounds = TOTAL_ROUNDS;
    gameState.roundsCorrect = 0;
    gameState.badGuesses = 0;
    gameState.currentProblem = {}
    nextProblem();
}
function setContent(content){
    document.body.innerHTML=content;
}
function main(){
    startGame();
}