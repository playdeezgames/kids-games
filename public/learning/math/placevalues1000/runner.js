import { App } from "../../common/app.js"
import { ProblemGenerator } from "./problemgenerator.js" //parameter
const TITLE = "Place Values (1,000)" //parameter
const PROBLEM_COUNT = 10 //parameter
window.doCommand = App.doCommand
window.doInput = App.doInput
document.addEventListener("DOMContentLoaded", e => App.start(TITLE, PROBLEM_COUNT, ProblemGenerator))