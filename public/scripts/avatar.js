const START_COLUMN = 1;
const START_ROW = 18;
const START_ROOM = "start";
let avatar ={
    column: START_COLUMN,
    row: START_ROW,
    room: START_ROOM,
    inventory: {}
};
class Avatar{
    static reset(){
        Avatar.column = START_COLUMN;
        Avatar.row = START_ROW;
        Avatar.room = START_ROOM;
        Avatar.bumpColumn = null;
        Avatar.bumpRow = null;
        Avatar.clearInventory();
    }
    static clearInventory(){
        avatar.inventory={};
    }
    static get column(){
        return avatar.column;
    }
    static set column(v){
        avatar.column = v;
    }
    static get row(){
        return avatar.row;
    }
    static set row(v){
        avatar.row = v;
    }
    static get room(){
        return avatar.room;
    }
    static set room(v){
        avatar.room = v;
    }
    static set bumpColumn(v){
        avatar.bumpColumn = v;
    }
    static set bumpRow(v){
        avatar.bumpRow = v;
    }
    static get bumpColumn(){
        return avatar.bumpColumn;
    }
    static get bumpRow(){
        return avatar.bumpRow;
    }
    static addInventory(cell,amount){
        amount = amount || 1;
        let count = avatar.inventory[cell] || 0;
        avatar.inventory[cell]=count + amount;

    }
    static hasInventory(cell,amount){
        amount = amount || 1;
        let count = avatar.inventory[cell] || 0;
        return count >= amount;

    }
    static getInventory(cell){
        return avatar.inventory[cell] || 0;
    }
    static removeInventory(cell,amount){
        amount = amount || 1;
        let count = avatar.inventory[cell] || 0;
        count -= amount;
        if(count<=0){
            delete avatar.inventory[cell];
        }else{
            avatar.inventory[cell]=count;
        }
    }
    static getInventoryCells(){
        let result = [];
        for(let cell in avatar.inventory){
            result.push(cell);
        }
        return result;
    }
    
}