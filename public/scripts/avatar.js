const AVATAR_START_COLUMN = 1;
const AVATAR_START_ROW = 18;
const AVATAR_START_ROOM = "start";
const AVATAR_MAXIMUM_HEALTH = 10;
let avatar ={
    column: AVATAR_START_COLUMN,
    row: AVATAR_START_ROW,
    room: AVATAR_START_ROOM,
    health: AVATAR_MAXIMUM_HEALTH,
    inventory: {}
};
class Avatar{
    static reset(){
        Avatar.column = AVATAR_START_COLUMN;
        Avatar.row = AVATAR_START_ROW;
        Avatar.room = AVATAR_START_ROOM;
        Avatar.health = AVATAR_MAXIMUM_HEALTH;
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
    static get health(){
        return avatar.health;
    }
    static set health(value){
        if(value<0){
            value = 0;
        }else if(value>AVATAR_MAXIMUM_HEALTH){
            value = AVATAR_MAXIMUM_HEALTH;
        }
        avatar.health = value;
    }
    static applyThreat(threat){
        if(threat>0){
            //shields
            let shields = Avatar.getInventory(CELL_SHIELD);
            if(shields>threat){
                Avatar.removeInventory(CELL_SHIELD,shields-threat);
                threat = 0;
            }else{
                threat -= shields;
                Avatar.removeInventory(CELL_SHIELD,shields);
            }
            //health
            if(threat>0){
                Avatar.health = Avatar.health - threat;
            }
        }
    }
    
}