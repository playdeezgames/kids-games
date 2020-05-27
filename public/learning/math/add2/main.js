const TOTAL_ROUNDS = 10;
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
function submitAnswer(){
    let input = document.getElementById("answer");
    let answer = Number(input.value);
    input.value="";
    giveAnswer(answer);
    input.focus();
}
function onInput(){
    if(event.keyCode==13){
        submitAnswer();
    }
}
function showProblem(){
    let content = "";
    content+=`<p>#${gameState.totalRounds-gameState.roundsLeft} of ${gameState.totalRounds}</p><hr/>`;
    content+=`<h1>${gameState.currentProblem.first} + ${gameState.currentProblem.second} = ??</h1><hr/>`;
    content+=`<p><input type="text" autofocus id="answer" onkeydown="onInput();"/>`
    content+=`</p><span id="result"></span><p></p>`;
    setContent(content);
    let input = document.getElementById("answer");
    input.focus();
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
        let first = randomRange(gameState.minimum,gameState.maximum);
        let second = randomRange(gameState.minimum, 100-first);
        newProblem = {
            first:first,
            second:second
        }
    }while(newProblem.first==gameState.currentProblem.first && newProblem.second==gameState.currentProblem.second);
    newProblem.sum = newProblem.first + newProblem.second;
    gameState.currentProblem = newProblem;
    gameState.answerGiven = false;
    gameState.roundsLeft--;
    showProblem();
}
function startGame(){
    gameState.maximum = 100;
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