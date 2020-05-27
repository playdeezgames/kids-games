import { Utility } from "./utility.js"
export class Problem{
    constructor(prompt,answer,choices,scramble){
        this.prompt = prompt
        this.answer = answer
        this.choices = choices || []
        if(scramble){
            this.choices.sort(Utility.randomSort)
        }
    }
}