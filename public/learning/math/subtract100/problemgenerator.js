import { Problem } from "../../common/problem.js"
import { Utility } from "../../common/utility.js"
const MINIMUM_VALUE = 0
const MAXIMUM_VALUE = 100
export class ProblemGenerator {
    static generate() {
        let lhs = Utility.randomRange(MINIMUM_VALUE, MAXIMUM_VALUE)
        let rhs = Utility.randomRange(MINIMUM_VALUE, 100-lhs)
        let result = lhs + rhs
        let prompt = `${result} - ${rhs} = ?`
        let answer = `${lhs}`
        return new Problem(prompt, answer)
    }
}