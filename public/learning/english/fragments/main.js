const TOTAL_ROUNDS = 10;
const STORAGE_ITEM = "fragments";
const list=[];
const used=[];
function addToList(text,answer){
    list.push({
        text: text,
        answer: answer
    });
}
addToList("At the meeting.",true);
addToList("That little girl.",true);
addToList("We saw the dog.",false);
addToList("The hamster and its wheel.",true);
addToList("Today we are going to eat ham sandwiches.",false);
addToList("Let’s watch television!",false);
addToList("Magazines on the shelf.",true);
addToList("I am going to go to the library.",false);
addToList("That money.",true);
addToList("The book is great.",false);
addToList("We enjoyed the film.",false);
addToList("The scientist and the dinosaur that were in the car.",true);
addToList("The boss decides.",false);
addToList("They bought a new phone.",false);
addToList("On the table.",true);
addToList("That house on the corner.",true);
addToList("She sees the little boy.",false);
addToList("My car and its tires.",true);
addToList("Yesterday we ate pizza with vegetables.",false);
addToList("You need to go to the store.",false);
addToList("Fireplaces with logs.",true);
addToList("The family went to the restaurant.",false);
addToList("The wallet.",true);
addToList("I read it.",false);
addToList("Actors are cool.",false);
addToList("The little girl who was on the stage.",true);
addToList("My teacher said it.",false);
addToList("The chair and the blanket on the floor.",true);
addToList("At the party.",true);
addToList("That dress on the hanger.",true);
addToList("He wasn’t there.",false);
addToList("The house on the hill.",true);
addToList("We hate to eat onions.",false);
addToList("Let’s go to the play!",false);
addToList("Bricks in the wall.",true);
addToList("Michael wants to move.",false);
addToList("A cat.",true);
addToList("She ate it.",false);
addToList("Dogs are cute.",false);
addToList("That boy with the new bike.",true);
addToList("Which person is going to the restaurant?",false);
addToList("The fur coat in the closet.",true);
addToList("I farted.",false);
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
        content+=`<button onclick="giveAnswer(true)"><h3> Fragment </h3></button> `;
        content+=`<button onclick="giveAnswer(false)"><h3> Sentence </h3></button> `;
    }else{
        content+=`<button onclick="giveAnswer(false)"><h3> Sentence </h3></button> `;
        content+=`<button onclick="giveAnswer(true)"><h3> Fragment </h3></button> `;
    }
    content+=`</p><span id="result"></span><p></p>`;
    setContent(content);
}
function gameOver(){
    gameState.endTime = Date.now();
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
    gameState.currentProblem = {};
    gameState.startTime = Date.now();
    nextProblem();
}
function setContent(content){
    document.body.innerHTML=content;
}
function main(){
    setContent(`<p><button onclick="startGame();">Start</button></p>`);
}