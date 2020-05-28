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
addToList("At the meeting.","fragment");
addToList("That little girl.","fragment");
addToList("We saw the dog.","sentence");
addToList("The hamster and its wheel.","fragment");
addToList("Today we are going to eat ham sandwiches.","sentence");
addToList("Let’s watch television!","sentence");
addToList("Magazines on the shelf.","fragment");
addToList("I am going to go to the library.","sentence");
addToList("That money.","fragment");
addToList("The book is great.","sentence");
addToList("We enjoyed the film.","sentence");
addToList("The scientist and the dinosaur that were in the car.","fragment");
addToList("The boss decides.","sentence");
addToList("They bought a new phone.","sentence");
addToList("On the table.","fragment");
addToList("That house on the corner.","fragment");
addToList("She sees the little boy.","sentence");
addToList("My car and its tires.","fragment");
addToList("Yesterday we ate pizza with vegetables.","sentence");
addToList("You need to go to the store.","sentence");
addToList("Fireplaces with logs.","fragment");
addToList("The family went to the restaurant.","sentence");
addToList("The wallet.","fragment");
addToList("I read it.","sentence");
addToList("Actors are cool.","sentence");
addToList("The little girl who was on the stage.","fragment");
addToList("My teacher said it.","sentence");
addToList("The chair and the blanket on the floor.","fragment");
addToList("At the party.","fragment");
addToList("That dress on the hanger.","fragment");
addToList("He wasn’t there.","sentence");
addToList("The house on the hill.","fragment");
addToList("We hate to eat onions.","sentence");
addToList("Let’s go to the play!","sentence");
addToList("Bricks in the wall.","fragment");
addToList("Michael wants to move.","sentence");
addToList("A cat.","fragment");
addToList("She ate it.","sentence");
addToList("Dogs are cute.","sentence");
addToList("That boy with the new bike.","fragment");
addToList("Which person is going to the restaurant?","sentence");
addToList("The fur coat in the closet.","fragment");
addToList("I farted.","sentence");
list.sort(Utility.randomSort)
export class ProblemGenerator {
    static generate() {
        let item = list.shift()
        let prompt = item.text
        let answer = item.answer
        return new Problem(prompt, answer, ["sentence","fragment"])
    }
}