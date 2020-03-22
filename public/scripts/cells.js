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

let cellDescriptors = {};
class Cells{
    static load(){
        cellDescriptors[CELL_FAKE_WALL] = loadJSON("/assets/templates/cells/fakeWall.json");
        cellDescriptors[CELL_FLOOR] = loadJSON("/assets/templates/cells/floor.json");
        cellDescriptors[CELL_WALL] = loadJSON("/assets/templates/cells/wall.json");
        cellDescriptors[CELL_SIGN] = loadJSON("/assets/templates/cells/sign.json");
        cellDescriptors[CELL_WOOD_DOOR] = loadJSON("/assets/templates/cells/door.json");
        cellDescriptors[CELL_WOOD_DOOR_CYAN] = loadJSON("/assets/templates/cells/cyanDoor.json");
        cellDescriptors[CELL_WOOD_DOOR_MAGENTA] = loadJSON("/assets/templates/cells/magentaDoor.json");
        cellDescriptors[CELL_WOOD_DOOR_YELLOW] = loadJSON("/assets/templates/cells/yellowDoor.json");
        cellDescriptors[CELL_KEY_CYAN] = loadJSON("/assets/templates/cells/cyanKey.json");
        cellDescriptors[CELL_KEY_MAGENTA] = loadJSON("/assets/templates/cells/magentaKey.json");
        cellDescriptors[CELL_KEY_YELLOW] = loadJSON("/assets/templates/cells/yellowKey.json");
        cellDescriptors[CELL_AVATAR] = loadJSON("/assets/templates/cells/avatar.json");
        cellDescriptors[CELL_TORCH] = loadJSON("/assets/templates/cells/torch.json");
        cellDescriptors[CELL_CAT] = loadJSON("/assets/templates/cells/cat.json");
        cellDescriptors[CELL_FISHBONE] = loadJSON("/assets/templates/cells/fishbone.json");
        cellDescriptors[CELL_MAGIC_PORTAL] = loadJSON("/assets/templates/cells/magicPortal.json");
        cellDescriptors[CELL_TRAP] = loadJSON("/assets/templates/cells/trap.json");
        cellDescriptors[CELL_LEVER_RED] = loadJSON("/assets/templates/cells/redLever.json");
        cellDescriptors[CELL_LEVER_GREEN] = loadJSON("/assets/templates/cells/greenLever.json");
        cellDescriptors[CELL_MINION] = loadJSON("/assets/templates/cells/minion.json");
        cellDescriptors[CELL_BROADSWORD] = loadJSON("/assets/templates/cells/broadsword.json");
        cellDescriptors[CELL_SHIELD] = loadJSON("/assets/templates/cells/shield.json");
        cellDescriptors[CELL_HEALTH_POTION] = loadJSON("/assets/templates/cells/healthPotion.json");
        cellDescriptors[CELL_CHICKEN_LEG] = loadJSON("/assets/templates/cells/chickenLeg.json");
        cellDescriptors[CELL_COFFIN] = loadJSON("/assets/templates/cells/coffin.json");
        cellDescriptors[CELL_MOVE] = loadJSON("/assets/templates/cells/move.json");
        cellDescriptors[CELL_TREE] = loadJSON("/assets/templates/cells/tree.json");
        cellDescriptors[CELL_BED] = loadJSON("/assets/templates/cells/bed.json");
        cellDescriptors[CELL_TREE_CHOPPABLE] = loadJSON("/assets/templates/cells/choppableTree.json");
        cellDescriptors[CELL_WHET_STONE] = loadJSON("/assets/templates/cells/whetStone.json");
        cellDescriptors[CELL_AXE_USABLE] = loadJSON("/assets/templates/cells/usableAxe.json");
        cellDescriptors[CELL_AXE_DULL] = loadJSON("/assets/templates/cells/dullAxe.json");
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
}