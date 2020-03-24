let avatar ={};
let avatarTemplate = {};
class Avatar{
    static load(){
        avatarTemplate = loadJSON(URL_AVATAR_TEMPLATE);
    }
    static reset(){
        avatar = Utility.copy(avatarTemplate);
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
    static get cell(){
        if(Avatar.alive){
            return avatar.cellStates.alive;
        }else{
            return avatar.cellStates.dead;
        }
    }
    static get alive(){
        return avatar.health>0;
    }
    static get health(){
        return avatar.health;
    }
    static get maximumHealth(){
        return avatar.maximumHealth;
    }
    static set health(value){
        avatar.health = Utility.clamp(0,Avatar.maximumHealth,value);//TODO: eliminate const use
    }
    static get energy(){
        return avatar.energy;
    }
    static get maximumEnergy(){
        return avatar.maximumEnergy;
    }
    static set energy(value){
        avatar.energy = Utility.clamp(0,Avatar.maximumEnergy,value);//TODO: eliminate const use
    }
    static applyThreat(threat){
        if(threat>0){
            //shields
            let shields = Avatar.getInventory(CELL_SHIELD);//TODO: eliminate CELL_XXXXX consts
            if(shields>threat){
                Avatar.removeInventory(CELL_SHIELD,shields-threat);//TODO: eliminate CELL_XXXXX consts
                threat = 0;
            }else{
                threat -= shields;
                Avatar.removeInventory(CELL_SHIELD,shields);//TODO: eliminate CELL_XXXXX consts
            }
            //health
            if(threat>0){
                Avatar.health = Avatar.health - threat;
            }
        }
    }
    static eat(){
        if(Avatar.alive){
            if(Avatar.health < Avatar.maximumHealth && Avatar.hasInventory(CELL_CHICKEN_LEG)){//TODO: eliminate CELL_XXXXX consts
                Avatar.removeInventory(CELL_CHICKEN_LEG);//TODO: eliminate CELL_XXXXX consts
                Avatar.health += 1;
            }
        }else{
            if(Avatar.hasInventory(CELL_HEALTH_POTION)){//TODO: eliminate CELL_XXXXX consts
                Avatar.removeInventory(CELL_HEALTH_POTION);//TODO: eliminate CELL_XXXXX consts
                Avatar.health = Avatar.maximumHealth;//TODO: eliminate consts
            }
        }
    }
    static getSound(sound){
        if(sound!=null && avatar.sounds!=null && avatar.sounds[sound]!=null){
            return avatar.sounds[sound];
        }
    }
}