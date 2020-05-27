import { App } from "../../common/app.js"
import { ProblemGenerator } from "./problemgenerator.js.js" //parameter
const TITLE = "Place Values (1,000)" //parameter
const PROBLEM_COUNT = 10 //parameter
document.addEventListener("DOMContentLoaded", _ => App.start(TITLE, PROBLEM_COUNT, ProblemGenerator))