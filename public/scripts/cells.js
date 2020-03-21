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

let cellSprites = {};
cellSprites[CELL_BED]=SPRITE_BED;
cellSprites[CELL_TREE_CHOPPABLE]=SPRITE_TREE_CHOPPABLE;
cellSprites[CELL_WHET_STONE]=SPRITE_WHET_STONE;
cellSprites[CELL_AXE_USABLE]=SPRITE_AXE_USABLE;
cellSprites[CELL_AXE_DULL]=SPRITE_AXE_DULL;
cellSprites[CELL_TREE]=SPRITE_TREE;
cellSprites[CELL_HEALTH_POTION]=SPRITE_HEALTH_POTION;
cellSprites[CELL_CHICKEN_LEG]=SPRITE_CHICKEN_LEG;
cellSprites[CELL_COFFIN]=SPRITE_COFFIN;
cellSprites[CELL_MINION]=SPRITE_MINION;
cellSprites[CELL_BROADSWORD]=SPRITE_BROADSWORD;
cellSprites[CELL_SHIELD]=SPRITE_SHIELD;
cellSprites[CELL_LEVER_RED]=SPRITE_LEVER_RED;
cellSprites[CELL_LEVER_GREEN]=SPRITE_LEVER_GREEN;
cellSprites[CELL_WALL]=SPRITE_WALL;
cellSprites[CELL_AVATAR]=SPRITE_AVATAR;
cellSprites[CELL_SIGN]=SPRITE_SIGN;
cellSprites[CELL_WOOD_DOOR]=SPRITE_WOOD_DOOR;
cellSprites[CELL_WOOD_DOOR_CYAN]=SPRITE_WOOD_DOOR_CYAN;
cellSprites[CELL_WOOD_DOOR_MAGENTA]=SPRITE_WOOD_DOOR_MAGENTA;
cellSprites[CELL_WOOD_DOOR_YELLOW]=SPRITE_WOOD_DOOR_YELLOW;
cellSprites[CELL_KEY_CYAN]    = SPRITE_KEY_CYAN;
cellSprites[CELL_KEY_MAGENTA] = SPRITE_KEY_MAGENTA;
cellSprites[CELL_KEY_YELLOW]  = SPRITE_KEY_YELLOW;
cellSprites[CELL_TORCH] = SPRITE_TORCH;
cellSprites[CELL_CAT] = SPRITE_CAT;
cellSprites[CELL_FISHBONE] = SPRITE_FISHBONE;
cellSprites[CELL_MAGIC_PORTAL] = SPRITE_MAGIC_PORTAL;
class Cells{
    static getSprite(cell){
        return cellSprites[cell];
    }
    static isBlocking(cell){
        return cell == CELL_WALL 
            || cell == CELL_TREE
            || cell == CELL_LEVER_GREEN
            || cell == CELL_LEVER_RED
            || cell == CELL_MINION
            || cell == CELL_BED
            || cell == CELL_WHET_STONE
            || Cells.isSign(cell) 
            || Cells.isLocked(cell);
    }
    static isLocked(cell){
        return Cells.getKey(cell)!=null;
    }
    static isTrigger(cell){
        return cell == CELL_TRAP
            || cell == CELL_LEVER_GREEN
            || cell == CELL_LEVER_RED
            || cell == CELL_WHET_STONE
            || cell == CELL_BED
    }
    static isCreature(cell){
        return cell == CELL_MINION;
    }
    static getThreatLevel(cell){
        if(cell == CELL_MINION){
            return 1;
        }else{
            return 0;
        }
    }
    static getKey(cell){
        if(cell==CELL_WOOD_DOOR_CYAN){
            return CELL_KEY_CYAN
        }else if(cell==CELL_WOOD_DOOR_MAGENTA){
            return CELL_KEY_MAGENTA;
        }else if(cell==CELL_WOOD_DOOR_YELLOW){
            return CELL_KEY_YELLOW;
        }else if(cell==CELL_CAT){
            return CELL_FISHBONE;
        }else{
            return null;
        }
    }
    static unlock(cell){
        if(cell==CELL_WOOD_DOOR_CYAN){
            return CELL_WOOD_DOOR;
        }else if(cell==CELL_WOOD_DOOR_MAGENTA){
            return CELL_WOOD_DOOR;
        }else if(cell==CELL_WOOD_DOOR_YELLOW){
            return CELL_WOOD_DOOR;
        }else if(cell==CELL_CAT){
            return CELL_FLOOR;
        }else{
            return cell;
        }
    }
    static isSign(cell){
        return cell == CELL_SIGN;
    }
    static isExit(cell){
        return cell == CELL_WOOD_DOOR 
            || cell == CELL_MAGIC_PORTAL;
    }
    static isItem(cell){
        return cell == CELL_KEY_CYAN 
            || cell == CELL_KEY_MAGENTA 
            || cell == CELL_KEY_YELLOW 
            || cell == CELL_BROADSWORD
            || cell == CELL_SHIELD
            || cell == CELL_TORCH 
            || cell == CELL_HEALTH_POTION
            || cell == CELL_CHICKEN_LEG
            || cell == CELL_AXE_DULL
            || cell == CELL_AXE_USABLE
            || cell == CELL_FISHBONE;
    }
    static isLit(cell,dx,dy){
        if(cell==CELL_AVATAR){
            if(Math.abs(dx)>1 || Math.abs(dy)>1){
                return Avatar.hasInventory(CELL_TORCH);
            }else{
                return true;
            }
        }else{
            return cell == CELL_TORCH;
        }
    }
}