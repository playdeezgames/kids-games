const CELL_WALL = "#";
const CELL_AVATAR = "@";
const CELL_FLOOR = ".";
const CELL_SIGN = "!";
const CELL_WOOD_DOOR = "+";
let cellSprites = {};
cellSprites[CELL_WALL]=SPRITE_WALL;
cellSprites[CELL_AVATAR]=SPRITE_AVATAR;
cellSprites[CELL_SIGN]=SPRITE_SIGN;
cellSprites[CELL_WOOD_DOOR]=SPRITE_WOOD_DOOR;
class Cells{
    static getSprite(cell){
        return cellSprites[cell];
    }
    static isBlocking(cell){
        return cell == CELL_WALL;
    }
    static isSign(cell){
        return cell == CELL_SIGN;
    }
    static isExit(cell){
        return cell == CELL_WOOD_DOOR;
    }
}