const TOTAL_ROUNDS = 10;
const list=[];
const used=[];
function addToList(text,answer){
    list.push({
        text: text,
        answer: answer
    });
}
addToList("bicycle",false);
addToList("read",true);
addToList("book",false);
addToList("tell",true);
addToList("story",false);
addToList("looks",true);
addToList("funny",false);
addToList("cat",false);
addToList("fun",false);
addToList("plays",true);
addToList("with",false);
addToList("child",false);
addToList("dog",false);
addToList("runs",true);
addToList("around",false);
addToList("the",false);
addToList("take",true);
addToList("glass",false);
addToList("drinks",true);
addToList("eat",true);
addToList("food",false);
addToList("pie",false);
addToList("pasta",false);
addToList("cuts",true);
addToList("boys",false);

addToList("bells",false);
addToList("ring",true);
addToList("sounds",false);
addToList("music",false);
addToList("walk",true);
addToList("climb",true);
addToList("sliding",true);
addToList("path",false);
addToList("the",false);
addToList("leaves",true);
addToList("falling",true);
addToList("girl",false);
addToList("talk",true);
addToList("friends",false);
addToList("piano",false);
addToList("flute",false);
addToList("rise",true);
addToList("think",true);
addToList("table",false);
addToList("sat",true);
addToList("onto",false);
addToList("couch",false);
addToList("put",true);
addToList("feet",false);
addToList("chair",false);
addToList("mitten",false);

addToList("swim",true);
addToList("ride",true);
addToList("broom",false);
addToList("wish",true);
addToList("tree",false);
addToList("work",true);
addToList("car",false);
addToList("sleep",true);
addToList("try",true);
addToList("pail",false);
addToList("flower",false);
addToList("find",true);
addToList("make",true);
addToList("bird",false);
addToList("go",true);
addToList("sit",true);
addToList("couch",false);

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
        content+=`<button onclick="giveAnswer(true)"><h3> Verb </h3></button> `;
        content+=`<button onclick="giveAnswer(false)"><h3> <strike>Verb</strike> </h3></button> `;
    }else{
        content+=`<button onclick="giveAnswer(false)"><h3> <strike>Verb</strike> </h3></button> `;
        content+=`<button onclick="giveAnswer(true)"><h3> Verb </h3></button> `;
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