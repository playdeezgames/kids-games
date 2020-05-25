const TOTAL_ROUNDS = 20;
const list=[];
const used=[];
function addToList(text,answer,choices){
    list.push({
        text: text,
        answer: answer,
        choices: choices
    });
}
addToList("Mark and Sue said <u>??????</u> have to go to school on Friday.","they",["he", "it", "their", "they", "she", "mine", "both"]);
addToList("Bob thought that <u>??????</u> could stay up until midnight.","he",["he", "it", "their", "they", "she", "mine", "both"]);
addToList("That is not your car. It’s <u>??????</u>mine",["he", "it", "their", "they", "she", "mine", "both"]);
addToList("The dog was sick, and <u>??????</u> wouldn’t play fetch with me.","it",["he", "it", "their", "they", "she", "mine", "both"]);
addToList("Julie was going to the store when <u>??????</u> fell off of her bike.","she",["he", "it", "their", "they", "she", "mine", "both"]);
addToList("Jason and Jamie asked <u>??????</u> parents if they could have some money.","their",["he", "it", "their", "they", "she", "mine", "both"]);

addToList("<u>??????</u> has to do homework this weekend.","no one",["any", "it", "no one", "they", "she", "mine", "both"]);
addToList("<u>??????</u> could talk to her friends on the phone on Tuesdays.","she",["any", "it", "no one", "they", "she", "mine", "both"]);
addToList("<u>??????</u> boys thought their parents were going to buy them new shoes.","both",["any", "it", "no one", "they", "she", "mine", "both"]);
addToList("The cat was happy, and <u>??????</u> purred loudly.","it",["any", "it", "no one", "they", "she", "mine", "both"]);
addToList("<u>??????</u> both wanted to go to Mexico for vacation.","they",["any", "it", "no one", "they", "she", "mine", "both"]);
addToList("<u>??????</u> student would be glad to have a day off to play in the snow.","any",["any", "it", "no one", "they", "she", "mine", "both"]);

addToList("Sally was sure <u>??????</u> would have to go to school on Friday.","she",["she","it","her","they","he","mine","their"]);
addToList("My parents thought <u>??????</u> dog was going to run out the door.","their",["she","it","her","they","he","mine","their"]);
addToList("That is not your cup. It’s <u>??????</u>.","mine",["she","it","her","they","he","mine","their"]);
addToList("My fish was happy to get food. <u>??????</u> swam quickly to the surface.","it",["she","it","her","they","he","mine","their"]);
addToList("Marie fell off <u>??????</u> bike on the way to school.","her",["she","it","her","they","he","mine","their"]);
addToList("Kristen and Jay said <u>??????</u> could go on the field trip.","they",["she","it","her","they","he","mine","their"]);

addToList("The hamster? <u>??????</u> will run all day long on its wheel.","it",["any","it","theirs","they","he","we","both"]);
addToList("<u>??????</u> can visit his grandma this Wednesday.","he",["any","it","theirs","they","he","we","both"]);
addToList("<u>??????</u> girls got good grades on their science test.","both",["any","it","theirs","they","he","we","both"]);
addToList("Ours were delicious, but <u>??????</u> tasted bad.","theirs",["any","it","theirs","they","he","we","both"]);
addToList("<u>??????</u> kid would be happy to eat ice cream for dinner.","any",["any","it","theirs","they","he","we","both"]);
addToList("<u>??????</u> are going to study all weekend.","we",["any","it","theirs","they","he","we","both"]);

addToList("Doug thought that <u>??????</u> was going to win the race.","he",["it","she","his","mine","they","he","its"]);
addToList("Doug lost because <u>??????</u> shoe fell off on his way.","his",["it","she","his","mine","they","he","its"]);
addToList("That is not your cat. It’s <u>??????</u>.","mine",["it","she","his","mine","they","he","its"]);
addToList("The dog licked <u>??????</u> bowl and took a nap.","its",["it","she","his","mine","they","he","its"]);
addToList("Lacey said <u>??????</u> was going to be at the concert tomorrow.","she",["it","she","his","mine","they","he","its"]);
addToList("James and Aaron asked if <u>??????</u> could have pizza for breakfast.","they",["it","she","his","mine","they","he","its"]);
addToList("Is that your parents’ car? Yes, it is <u>??????</u>.","theirs",["no one","any","both","they","she","it","theirs"]);
addToList("<u>??????</u> ate all of her soup at lunch.","she",["no one","any","both","they","she","it","theirs"]);
addToList("<u>??????</u> teachers are getting new classrooms.","both",["no one","any","both","they","she","it","theirs"]);
addToList("<u>??????</u> likes to wake up early to go to school.","no one",["no one","any","both","they","she","it","theirs"]);
addToList("<u>??????</u> dog would love to eat a steak every day.","any",["no one","any","both","they","she","it","theirs"]);
addToList("<u>??????</u> want to play soccer in the park.","they",["no one","any","both","they","she","it","theirs"]);

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
    gameState.currentProblem = {}
    nextProblem();
}
function setContent(content){
    document.body.innerHTML=content;
}
function main(){
    startGame();
}