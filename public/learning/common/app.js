import { Display } from "./display.js"
import { Utility } from "./utility.js"
const COMMAND_START = "start"
const COMMAND_ANSWER = "answer"
const TITLE = "Place Values (1,000)" //parameter
const PROBLEM_COUNT = 10 //parameter
let problemSet = []
let appState
let currentProblem;
export class App {
    static start(title, problemCount, problemGenerator) {
        App.createProblemSet(problemGenerator, problemCount)
        Display.setContent(`<h1>${title}</h1><p>${Display.commandButton("Start!", [COMMAND_START])}</p>`)
    }
    static showProblem(){
        let content = ""
        content += `<p>Problem ${appState.completedProblems + 1} of ${appState.problemCount} (${appState.problemCount-appState.completedProblems} left)</p><hr/>`
        currentProblem = problemSet.shift()
        content += `<h1>${currentProblem.prompt}<span id="result"></span><p></h1><hr/>`
        content += "<p>"
        if(currentProblem.choices.length>0){

        }else{
            content+=`<input type="text" autofocus id="answer" onkeydown="doInput();"/>`
        }
        content += "</p>"
        Display.setContent(content)
        let input = document.getElementById("answer")
        if(input){
            input.focus()
        }
    }
    static createProblemSet(problemGenerator, problemCount) {
        let table = {}
        problemSet = []
        while (problemSet.length < problemCount) {
            let problem = problemGenerator.generate()
            if (table[problem.prompt] == null) {
                table[problem.prompt] = true
                problemSet.push(problem)
            }
        }
        problemSet.sort(Utility.randomSort)
    }
    static startSession() {
        appState = {
            problemCount: problemSet.length,
            startTime: Date.now(),
            completedProblems: 0,
            wrongAnswers: 0
        }
        App.nextProblem()
    }
    static nextProblem(){
        if(problemSet.length>0){
            App.showProblem()
        }else{
            App.endSession()
        }
    }
    static endSession(){
        appState.endTime = Date.now()
        let seconds = Math.floor((appState.endTime-appState.startTime)/1000)
        let minutes = Math.floor(seconds/60)
        seconds %= 60
        let content = "";
        content += "<h1>All done!</h1>";
        content += `<p>Correct Answers: ${appState.completedProblems}<br/>`;
        content += `Incorrect Answers: ${appState.wrongAnswers}<br/>`;
        let total = appState.completedProblems + appState.wrongAnswers
        content += `Total Answers: ${total}<br/>`
        let percentage = Math.round(100 * appState.completedProblems / total);
        content += `Percentage: ${percentage}%<br/>`
        content += `Time: ${minutes}m ${seconds}s</p>`
        Display.setContent(content);
    }
    static correctAnswer(){
        appState.completedProblems++
        document.getElementById("result").innerHTML=`<img src="./confirmed.png"/>`
        setTimeout(()=>{
            App.nextProblem();
        },1000);
    }
    static incorrectAnswer(){
        appState.incorrectAnswer++
        document.getElementById("result").innerHTML=`<img src="./cancel.png"/>`
        setTimeout(()=>{
            document.getElementById("result").innerHTML=""
            App.enableInput()
        },1000);
    }
    static disableInput(){

    }
    static enableInput(){

    }
    static checkAnswer(tokens){
        App.disableInput()
        let answer = tokens.join(" ")
        if(answer==currentProblem.answer){
            App.correctAnswer()
        }else{
            App.incorrectAnswer()
        }
    }
    static doCommand(tokens) {
        let command = tokens.shift()
        switch (command) {
            case COMMAND_START:
                App.startSession()
                break
            case COMMAND_ANSWER:
                App.checkAnswer(tokens)
                break;
        }
    }
    static doInput(){
        if(event.keyCode==13){
            let input = document.getElementById("answer");
            let answer = input.value;
            input.value="";
            App.doCommand(["answer",answer]);
            input.focus();
        }
    }
}
