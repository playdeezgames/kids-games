import { Problem } from "./problem.js"
import { Utility } from "./utility.js"
export class ProblemGenerator {
    static generate() {
        let thousands = Utility.randomRange(1,9)
        let hundreds = Utility.randomRange(1,9)
        let tens =  Utility.randomRange(1,9)
        let ones = Utility.randomRange(0,9)
        let prompt = `${thousands},000 + ${hundreds}00 + ${tens}0 + ${ones} = ?`
        let answer = `${thousands},${hundreds}${tens}${ones}`
        return new Problem(prompt, answer)
    }
}