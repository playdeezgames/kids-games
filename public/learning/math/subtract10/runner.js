import { App } from "../../common/app.js"
import { ProblemGenerator } from "./problemgenerator.js" //parameter
const TITLE = "Subtract (up to 10)" //parameter
const PROBLEM_COUNT = 10 //parameter
document.addEventListener("DOMContentLoaded", _ => App.start(TITLE, PROBLEM_COUNT, ProblemGenerator))