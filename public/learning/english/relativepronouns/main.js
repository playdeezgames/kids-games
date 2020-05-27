const TOTAL_ROUNDS = 10;
const list=[];
const used=[];
function addToList(text,answer,choices){
    list.push({
        text: text,
        answer: answer,
        choices: choices
    });
}

addToList("Do you know <u>??????</u> is coming to the party?","who",["who","whom","whose"]);
addToList("The student to <u>??????</u> I spoke was very kind.","whom",["who","whom","whose"]);
addToList("You are eating dinner with <u>??????</u>?","whom",["who","whom","whose"]);
addToList("I have no idea <u>??????</u> notebook this is.","whose",["who","whom","whose"]);
addToList("I saw a man <u>??????</u> was at least seven feet tall.","who",["who","whom","whose"]);
addToList("<u>??????</u> is your favorite teacher?","who",["who","whom","whose"]);
addToList("She doesn’t know <u>??????</u> book was left behind.","whose",["who","whom","whose"]);
addToList("My mom asked <u>??????</u> made the card for her.","who",["who","whom","whose"]);
addToList("For <u>??????</u> did you make this birthday cake?","whom",["who","whom","whose"]);
addToList("<u>??????</u> car is parked in our garage?","whose",["who","whom","whose"]);

addToList("The girl with <u>??????</u> I worked was very quiet.","whom",["who","whom","whose"]);
addToList("You are talking to <u>??????</u>?","whom",["who","whom","whose"]);
addToList("Does anyone know <u>??????</u> backpack this is?","whose",["who","whom","whose"]);
addToList("She talked to a woman <u>??????</u> knows my mom.","who",["who","whom","whose"]);
addToList("<u>??????</u> was at the park today?","who",["who","whom","whose"]);
addToList("Darren has no clue <u>??????</u> sock was in his car.","whose",["who","whom","whose"]);
addToList("My dad wondered <u>??????</u> forgot to lock the door.","who",["who","whom","whose"]);
addToList("With <u>??????</u> did you ride to school today?","whom",["who","whom","whose"]);
addToList("<u>??????</u> cat is walking in our yard?","whose",["who","whom","whose"]);
addToList("Mrs. Smith asked <u>??????</u> had finished the assignment.","who",["who","whom","whose"]);

addToList("You are traveling with <u>??????</u> toChicago?","whom",["who","whom","whose"]);
addToList("Did you find out <u>??????</u> house we are visiting?","whose",["who","whom","whose"]);
addToList("The man <u>??????</u> came with us is my uncle.","who",["who","whom","whose"]);
addToList("<u>??????</u> is that girl with your cousin?","who",["who","whom","whose"]);
addToList("Sharon doesn’t know <u>??????</u> pencil was on the desk.","whose",["who","whom","whose"]);
addToList("We asked <u>??????</u> was making dinner tonight.","who",["who","whom","whose"]);
addToList("For <u>??????</u> did you buy that gift?","whom",["who","whom","whose"]);
addToList("<u>??????</u> baby is crying all night?","whose",["who","whom","whose"]);
addToList("My brother wondered <u>??????</u> took his backpack.","who",["who","whom","whose"]);
addToList("Did you see the boy <u>??????</u> bike was stolen?","whose",["who","whom","whose"]);

list.sort((a,b)=>randomRange(0,1)*2-1);

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
    let choices = gameState.currentProblem.choices.sort((a,b)=>randomRange(0,1)*2-1);
    for(let choice of choices){
        content+=`<button onclick="giveAnswer('${choice}')"><h3> ${choice} </h3></button> `;

    }
    content+=`</p><span id="result"></span><p></p>`;
    setContent(content);
}
function gameOver(){
    let content="";
    gameState.endTime = Date.now();
    content+="<h1>All done!</h1>";
    content+=`<p>Rounds: ${gameState.roundsCorrect}</p>`;
    content+=`<p>Wrong Guesses: ${gameState.badGuesses}</p>`;
    content+=`<p>Time Taken: ${Math.floor((gameState.endTime-gameState.startTime)/1000)}</p>`;
    setContent(content);
}
function nextProblem(){
    if(gameState.roundsLeft<=0){
        gameOver();
        return;
    }
    gameState.currentProblem = list.shift();
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
    setContent(`<button onclick="startGame()">Start</button>`);
}