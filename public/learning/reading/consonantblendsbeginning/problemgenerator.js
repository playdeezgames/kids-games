import { Problem } from "../../common/problem.js"
import { Utility } from "../../common/utility.js"
const MINIMUM_VALUE = 0
const MAXIMUM_VALUE = 10
const list=[];
function addToList(text,answer){
    list.push({
        text: text,
        answer: answer
    });
}
addToList("what","wh")
addToList("where","wh")
addToList("when","wh")
addToList("whale","wh")
addToList("wheel","wh")
addToList("while","wh")

addToList("the","th")
addToList("they","th")
addToList("then","th")
addToList("them","th")
addToList("third","th")
addToList("throw","th")

addToList("chair","ch")
addToList("chin","ch")
addToList("chip","ch")
addToList("cheese","ch")
addToList("chew","ch")
addToList("chop","ch")

addToList("ship","sh")
addToList("shop","sh")
addToList("shed","sh")
addToList("shall","sh")
addToList("sheep","sh")
addToList("shelf","sh")

list.sort(Utility.randomSort)
export class ProblemGenerator {
    static generate() {
        let item = list.shift()
        let prompt = item.text
        let answer = item.answer
        return new Problem(prompt, answer)
    }
}