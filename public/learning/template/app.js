import { Display } from "./display.js"
import { ProblemGenerator } from "./problemgenerator.js"
import { Utility } from "./utility.js"
const COMMAND_START = "start"
const TITLE = "Template"
const PROBLEM_COUNT = 10
let problemSet = []
let appState
export class App {
    static start() {
        Display.setContent(`<h1>${TITLE}</h1><p>${Display.commandButton("Start!", [COMMAND_START])}</p>`)
    }
    static showProblem(){
        let content = ""
        content += `<p>Problem ${appState.completedProblems + 1} of ${PROBLEM_COUNT} (${PROBLEM_COUNT-appState.completedProblems} left)</p><hr/>`
        let problem = problemSet.shift()
        content += `<h1>${problem.prompt}</h1><hr/>`
        if(problem.choices){

        }else{
            content+=`<p><input type="text" autofocus id="answer" onkeydown="doInput();"/>`
        }
        Display.setContent(content)
        let input = document.getElementById("answer")
        if(input){
            input.focus()
        }
    }
    static createProblemSet() {
        let table = {}
        problemSet = []
        while (problemSet.length < PROBLEM_COUNT) {
            let problem = ProblemGenerator.generate()
            if (table[problem.prompt] == null) {
                table[problem.prompt] = true
                problemSet.push(problem)
            }
        }
        problemSet.sort(Utility.randomSort)
        App.showProblem();
    }
    static startSession() {
        appState = {
            startTime = Date.now(),
            completedProblems = 0,
            wrongAnswers = 0
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
        let seconds = Math.floor((app.endTime-appState.startTime)/1000)
        let minutes = Math.floor(seconds/60)
        seconds %= 60
        let content = "";
        content += "<h1>All done!</h1>";
        content += `<p>Correct Answers: ${appState.completedProblems}</p>`;
        content += `<p>Incorrect Answers: ${appState.wrongAnswers}</p>`;
        let total = appState.completedProblems + appState.wrongAnswers
        content += `<p>Total Answers: ${total}</p>`
        let percentage = Math.round(100 * appState.completedProblems / total);
        content += `<p>Percentage: ${percentage}%</p>`
        content += `<p>Time: ${minutes}m ${seconds}s</p>`
        Display.setContent(content);
    }
    static doCommand(tokens) {
        let command = tokens.shift()
        switch (command) {
            case COMMAND_START:
                App.createProblemSet()
                App.startSession()
                break
        }
    }
    static doInput(){
        if(event.keyCode==13){
            let input = document.getElementById("answer");
            let answer = Number(input.value);
            input.value="";
            App.doCommand(["answer",answer]);
            input.focus();
        }
    }
}
window.doCommand = App.doCommand
window.doInput = App.doInput
document.addEventListener("DOMContentLoaded", App.start)