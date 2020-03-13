const CELL_WALL = "#";
const CELL_AVATAR = "@";
const CELL_FLOOR = ".";
const CELL_NORTH_EXIT = "^";
const CELL_SOUTH_EXIT = "v";
const CELL_EAST_EXIT = ">";
const CELL_WEST_EXIT = "<";
const ROOM_COLUMNS = 20;
const ROOM_ROWS = 20;

let roomDatas = {
    start:[
        "#########^##########",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................>",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "<..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#############v######"
      ]
};
let cellSprites = {};
cellSprites[CELL_WALL]=SPRITE_WALL;
cellSprites[CELL_AVATAR]=SPRITE_AVATAR;
cellSprites[CELL_NORTH_EXIT]=SPRITE_UP_ARROW;
cellSprites[CELL_SOUTH_EXIT]=SPRITE_DOWN_ARROW;
cellSprites[CELL_EAST_EXIT]=SPRITE_RIGHT_ARROW;
cellSprites[CELL_WEST_EXIT]=SPRITE_LEFT_ARROW;

function convertToLevelData(lines){
    let level = [];
    for(let row in lines){
      let line = lines[row];
      let levelRow = [];
      for(let column=0;column<line.length;++column){
        levelRow.push(line.charAt(column));
      }
      level.push(levelRow);
    }
    return level;
  }
let rooms = {
    start: {
        data: convertToLevelData(roomDatas.start)
    }
};
class Rooms{
    static getCell(room,column,row){
        return rooms[room].data[row][column];
    }
    static setCell(room,column,row,cell){
        rooms[room].data[row][column] = cell;
    }
    //TODO: not entirely happy where this is
    static getCellSprite(cell){
        return cellSprites[cell];
    }
}