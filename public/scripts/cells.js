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

let cellSprites = {};
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
class Cells{
    static getSprite(cell){
        return cellSprites[cell];
    }
    static isBlocking(cell){
        return cell == CELL_WALL || Cells.isSign(cell) || Cells.isLocked(cell);
    }
    static isLocked(cell){
        return Cells.getKey(cell)!=null;
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
        return cell == CELL_WOOD_DOOR;
    }
    static isItem(cell){
        return cell == CELL_KEY_CYAN || cell == CELL_KEY_MAGENTA || cell == CELL_KEY_YELLOW || cell == CELL_TORCH || cell == CELL_FISHBONE;
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