const TOTAL_ROUNDS = 20;
const CHOICE_COUNT = 4;
const table={};
const list = [];
const used = [];
const answers = [];
function addToTable(word){
    list.push(word);
    table[word]={
        imageUrl:`../../assets/things/${word}.png`,
        prompt:`_${word.substring(1)}`,
        answer:`${word.substring(0,1)}`
    };
    if(answers.find(x=>x==table[word].answer)==null){
        answers.push(table[word].answer);
    }
}
addToTable("alligator");
addToTable("angel");
addToTable("apple");
addToTable("banana");
addToTable("bear");
addToTable("bed");
addToTable("bird");
addToTable("boat");
addToTable("boy");
addToTable("cat");
addToTable("cow");
addToTable("deer");
addToTable("dog");
addToTable("elephant");
addToTable("elf");
addToTable("eye");
addToTable("fish");
addToTable("foot");
addToTable("fork");
addToTable("fox");
addToTable("giraffe");
addToTable("girl");
addToTable("goat");
addToTable("gun");
addToTable("hammer");
addToTable("hand");
addToTable("house");
addToTable("igloo");
addToTable("iguana");
addToTable("jacket");
addToTable("kite");
addToTable("ladder");
addToTable("lion");
addToTable("mouse");
addToTable("mouth");
addToTable("nose");
addToTable("octopus");
addToTable("ostrich");
addToTable("owl");
addToTable("panda");
addToTable("pear");
addToTable("penguin");
addToTable("pig");
addToTable("pumpkin");
addToTable("rainbow");
addToTable("rifle");
addToTable("ring");
addToTable("roof");
addToTable("teapot");
addToTable("television");
addToTable("tongue");
addToTable("turtle");
addToTable("umbrella");
addToTable("unicorn");
addToTable("vest");
addToTable("watermelon");
addToTable("window");
addToTable("yarn");
addToTable("yoyo");
addToTable("zebra");
let gameState = {};
function randomRange(minimum, maximum){
    return Math.floor(Math.random()*(maximum-minimum+1))+minimum;
}
function randomArray(array){
    return array[randomRange(0,array.length-1)];
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
    let problem = gameState.currentProblem;
    content+=`<img src="${problem.imageUrl}" width="350" height="350"><br/><h1>${problem.prompt}</h1><hr/>`;
    let choices=[problem.answer];
    while(choices.length<CHOICE_COUNT){
        let choice;
        do{
            choice = randomArray(answers);
        }while(choices.find(x=>x==choice)!=null);
        choices.push(choice);
    }
    choices.sort((a,b)=>{return randomRange(0,1)*2-1;});
    content+="<p>"
    for(let item of choices){
        content+=`<button onclick="giveAnswer('${item}')"><h3> ${item} </h3></button> `;
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
    used.push(newProblem);
    gameState.currentProblem = table[newProblem];
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