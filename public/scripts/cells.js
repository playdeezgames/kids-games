const CELL_FLOOR = 0;
const CELL_WALL = 1;
const CELL_SIGN = 2;
const CELL_WOOD_DOOR = 3;
const CELL_WOOD_DOOR_CYAN = 4;
const CELL_WOOD_DOOR_MAGENTA = 5;
const CELL_WOOD_DOOR_YELLOW = 6;
const CELL_KEY_CYAN = 7;
const CELL_KEY_MAGENTA = 8;
const CELL_KEY_YELLOW = 9;
const CELL_AVATAR = 10;
const CELL_TORCH = 11;
const CELL_CAT = 12;
const CELL_FISHBONE = 13;
const CELL_MAGIC_PORTAL = 14;
const CELL_TRAP = 15;
const CELL_LEVER_RED = 16;
const CELL_LEVER_GREEN = 17;
const CELL_MINION = 18;
const CELL_BROADSWORD = 19;
const CELL_SHIELD = 20;
const CELL_HEALTH_POTION = 21;
const CELL_CHICKEN_LEG = 22;
const CELL_COFFIN = 23;
const CELL_MOVE = 24;
const CELL_TREE = 25;
const CELL_BED = 26;
const CELL_TREE_CHOPPABLE = 27;
const CELL_WHET_STONE = 28;
const CELL_AXE_USABLE = 29;
const CELL_AXE_DULL = 30;
const CELL_FAKE_WALL = 31;
const CELL_FAKE_TREE = 32;
const CELL_CONE = 33;

const REQUIREMENT_HAS_ENERGY = "has-energy";
const REQUIREMENT_HAS_ITEM = "has-item";

const EFFECT_ADD_ENERGY = "add-energy";
const EFFECT_REMOVE_ENERGY = "remove-energy";
const EFFECT_REMOVE_INVENTORY = "remove-inventory";
const EFFECT_ADD_INVENTORY = "add-inventory";
const EFFECT_SET_CELL = "set-cell";

let cellDescriptors = {};
class Cells{
    static load(){
        loadJSON("assets/templates/cells/cells.json",(data)=>{
            for(let cell in data){
                cellDescriptors[cell]=loadJSON(data[cell]);
            }
        });
    }
    static getSprite(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.sprite;
        }else{
            return null;
        }
    }
    static isBlocking(cell){
        if(Cells.isSign(cell) || Cells.isLocked(cell) || Cells.canInteract(cell)){
            return true;
        }else{
            let descriptor = cellDescriptors[cell];
            if(descriptor!=null){
                return descriptor.isBlocking || false;
            }else{
                return false;
            }
        }
    }
    static isLocked(cell){
        return Cells.getKey(cell)!=null;
    }
    static isTrigger(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.isTrigger || false;
        }else{
            return false;
        }
    }
    static canInteract(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.canInteract || false;
        }else{
            return false;
        }
    }
    static isCreature(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.isCreature || false;
        }else{
            return false;
        }
    }
    static getThreatLevel(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.threatLevel || 0;
        }else{
            return 0;
        }
    }
    static getKey(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.key;
        }else{
            return null;
        }
    }
    static unlock(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.unlocked;
        }else{
            return null;
        }
    }
    static isSign(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.isSign || false;
        }else{
            return false;
        }
    }
    static isExit(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.isExit || false;
        }else{
            return false;
        }
    }
    static isItem(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return descriptor.isItem || false;
        }else{
            return false;
        }
    }
    static isLit(cell,dx,dy){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            if(descriptor.isLit || false){
                return true;
            }else if(descriptor.isAvatar || false){
                if(Math.abs(dx)>1 || Math.abs(dy)>1){
                    return Avatar.hasInventory(CELL_TORCH);//TODO: check through inventory for something lit
                }else{
                    return true;
                }
            }
        }else{
            return false;
        }
    }
    static canInteract(cell){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            return(descriptor.canInteract || false);
        }else{
            return false;
        }
    }
    static meetsInteractionRequirements(cell){
        if(Cells.canInteract(cell)){
            let requirements = cellDescriptors[cell].requirements;
            if(requirements!=null){
                let result = true;
                for(var index in requirements){
                    let requirement = requirements[index];
                    if(requirement.type == REQUIREMENT_HAS_ENERGY){
                        result = result && Avatar.energy>=(requirement.value || 1);
                    }else if(requirement.type == REQUIREMENT_HAS_ITEM){
                        result = result && Avatar.getInventory(requirement.value)>=(requirement.count || 1);
                    }
                }
                return result;
            }else{
                return true;//no requirements!
            }
        }else{
            return false;
        }
    }
    static interact(cell){
        let result = null;
        if(Cells.canInteract(cell)){
            let effects = cellDescriptors[cell].effects;
            if(effects!=null){
                for(var index in effects){
                    let effect = effects[index];
                    if(effect.type == EFFECT_ADD_ENERGY){
                        Avatar.energy += (effect.value || 1);
                    }else if(effect.type == EFFECT_ADD_INVENTORY){
                        Avatar.addInventory(effect.value, effect.count || 1);
                    }else if(effect.type == EFFECT_REMOVE_ENERGY){
                        Avatar.energy -= (effect.value || 1)
                    }else if(effect.type == EFFECT_REMOVE_INVENTORY){
                        Avatar.removeInventory(effect.value, effect.count || 1);
                    }else if(effect.type == EFFECT_SET_CELL){
                        result = effect.value;
                    }
                }
            }
        }
        return result;
    }
    static getSound(cell,sound){
        let descriptor = cellDescriptors[cell];
        if(descriptor!=null){
            if(descriptor.sounds!=null){
                return descriptor.sounds[sound];
            }
        }
        return null;
    }
}