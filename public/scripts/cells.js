const CELL_WALL = "#";
const CELL_AVATAR = "@";
const CELL_FLOOR = ".";
const CELL_NORTH_EXIT = "^";
const CELL_SOUTH_EXIT = "v";
const CELL_EAST_EXIT = ">";
const CELL_WEST_EXIT = "<";
const CELL_SIGN = "!";
let cellSprites = {};
cellSprites[CELL_WALL]=SPRITE_WALL;
cellSprites[CELL_AVATAR]=SPRITE_AVATAR;
cellSprites[CELL_NORTH_EXIT]=SPRITE_UP_ARROW;
cellSprites[CELL_SOUTH_EXIT]=SPRITE_DOWN_ARROW;
cellSprites[CELL_EAST_EXIT]=SPRITE_RIGHT_ARROW;
cellSprites[CELL_WEST_EXIT]=SPRITE_LEFT_ARROW;
cellSprites[CELL_SIGN]=SPRITE_SIGN;
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
}