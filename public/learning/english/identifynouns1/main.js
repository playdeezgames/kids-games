const TOTAL_ROUNDS = 10;
const list=[];
const used=[];
function addToList(text,answer){
    list.push({
        text: text,
        answer: answer
    });
}
addToList("the",false);
addToList("big",false);
addToList("Tom",true);
addToList("bus",true);
addToList("door",true);
addToList("cat",true);
addToList("stick",true);
addToList("ate",false);
addToList("win",false);
addToList("this",false);
addToList("on",false);
addToList("child",true);
addToList("apple",true);
addToList("mom",true);
addToList("pen",true);
addToList("rug",true);
addToList("go",false);
addToList("is",false);
addToList("one",false);
addToList("how",false);
addToList("dog",true);
addToList("bike",true);
addToList("sun",true);
addToList("desk",true);
addToList("room",true);
addToList("find",false);
addToList("are",false);
addToList("it",false);
addToList("red",false);
addToList("me",false);
addToList("up",false);
addToList("bat",true);
addToList("hit",false);
addToList("not",false);
addToList("Nick",true);
addToList("too",false);
addToList("fat",false);
addToList("ball",true);
addToList("dad",true);
addToList("tree",true);
addToList("mat",true);
addToList("cap",true);
addToList("run",false);
addToList("to",false);
addToList("day",true);
addToList("you",false);
addToList("eat",false);
addToList("be",false);
addToList("two",false);
addToList("well",false);
addToList("book",true);
addToList("hook",true);
addToList("that",false);
addToList("arm",true);
addToList("game",true);
addToList("hat",true);
addToList("but",false);
addToList("what",false);
addToList("foot",true);
addToList("play",false);
addToList("happy",false);
addToList("pillow",true);
addToList("goat",true);
addToList("make",false);
addToList("boy",true);
addToList("desk",true);
addToList("box",true);
addToList("fast",false);
addToList("lamp",true);
addToList("kite",true);
addToList("song",true);
addToList("dance",false);
addToList("water",true);
addToList("pencil",true);
addToList("draw",false);
addToList("snow",true);
addToList("slow",false);
addToList("towel",true);
addToList("sky",true);
addToList("monkey",true);
addToList("girl",true);
addToList("throw",false);
let gameState = {};
function randomRange(minimum, maximum){
    return Math.floor(Math.random()*(maximum-minimum+1))+minimum;
}
function giveAnswer(answer){
    if(gameState.answerGiven){
        return;
    }
    gameState.answerGiven=true;
    if(answer==gameState.currentProblem.answer){
        gameState.roundsCorrect++;
        document.getElementById("result").innerHTML=`<img src="../../assets/confirmed.png"/>`;
        setTimeout(()=>{
            nextProblem();
        },2000);
    }else{
        gameState.badGuesses++;
        document.getElementById("result").innerHTML=`<img src="../../assets/cancel.png"/>`;
        setTimeout(()=>{
            document.getElementById("result").innerHTML="";
            gameState.answerGiven=false;
        },2000);
    }
}
function showProblem(){
    let content = "";
    content+=`<p>#${gameState.totalRounds-gameState.roundsLeft} of ${gameState.totalRounds}</p><hr/>`;
    content+=`<h1>${gameState.currentProblem.text}</h1><hr/>`;
    content+="<p>"
    if(randomRange(0,1)==0){
        content+=`<button onclick="giveAnswer(true)"><h3> Noun </h3></button> `;
        content+=`<button onclick="giveAnswer(false)"><h3> <strike>Noun</strike> </h3></button> `;
    }else{
        content+=`<button onclick="giveAnswer(false)"><h3> <strike>Noun</strike> </h3></button> `;
        content+=`<button onclick="giveAnswer(true)"><h3> Noun </h3></button> `;
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
        newProblem = list[randomRange(0,list.length-1)];
    }while(used.find(x=>x==newProblem)!=null);
    gameState.currentProblem = newProblem;
    gameState.answerGiven = false;
    gameState.roundsLeft--;
    showProblem();
}
function startGame(){
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