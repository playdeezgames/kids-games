const FRAME_RATE = 10;
const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 640;
const BACKGROUND_COLOR = "#555555";
class Game{
    static preload(){
        Sprites.load();
    }
    static setup(){
        createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        frameRate(FRAME_RATE);
    }
    static update(){
        let nextColumn = Avatar.column;
        let nextRow = Avatar.row;
        if(Input.isKeyPressed(LEFT_ARROW)){
            nextColumn--;
        }
        if(Input.isKeyPressed(RIGHT_ARROW)){
            nextColumn++;
        }
        if(Input.isKeyPressed(UP_ARROW)){
            nextRow--;
        }
        if(Input.isKeyPressed(DOWN_ARROW)){
            nextRow++;
        }
        //is next column/row in bounds
        if(nextColumn>=0 && nextRow>=0 && nextColumn<ROOM_COLUMNS && nextRow<ROOM_ROWS){
            let cell = Rooms.getCell(Avatar.room, nextColumn, nextRow);
            if(cell==CELL_WALL){
                nextColumn = Avatar.column;
                nextRow = Avatar.row;
            }
            Avatar.column=nextColumn;
            Avatar.row=nextRow;
        }
    }
    static draw(){
        background(BACKGROUND_COLOR);
        Rooms.setCell(Avatar.room,Avatar.column,Avatar.row,CELL_AVATAR);
        for(let row=0;row<ROOM_ROWS;++row){
            for(let column=0;column<ROOM_COLUMNS;++column){
                let x = Plotter.plotX(column,row);
                let y = Plotter.plotY(column,row);

                let cell = Rooms.getCell(Avatar.room,column,row);

                let sprite = Rooms.getCellSprite(cell);
                if(sprite!=null){
                    Sprites.render(sprite,x,y);
                }
            }
        }
        Rooms.setCell(Avatar.room,Avatar.column,Avatar.row,".");
    }
}