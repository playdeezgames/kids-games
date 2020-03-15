const FRAME_RATE = 30;
const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 640;
const BACKGROUND_COLOR = "#555555";
const SIGNTEXT_COLOR = "#000000";
const UPDATE_TIMER = 200;
let updateTimer = 0;
class Game{
    static preload(){
        RoomData.load();
        Sprites.load();
    }
    static reset(){
        Rooms.reset();
        Avatar.reset();
    }
    static setup(){
        createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        frameRate(FRAME_RATE);
        Game.reset();
    }
    static update(){
        updateTimer += deltaTime;
        if(updateTimer>=UPDATE_TIMER){
            updateTimer-=UPDATE_TIMER;
            let nextColumn = Avatar.column;
            let nextRow = Avatar.row;
            if(Input.wasKeyPressed(LEFT_ARROW) || Input.wasKeyPressed(65)){
                nextColumn--;
            }
            if(Input.wasKeyPressed(RIGHT_ARROW) || Input.wasKeyPressed(68)){
                nextColumn++;
            }
            if(Input.wasKeyPressed(UP_ARROW) || Input.wasKeyPressed(87)){
                nextRow--;
            }
            if(Input.wasKeyPressed(DOWN_ARROW) || Input.wasKeyPressed(83)){
                nextRow++;
            }
            if(nextColumn!=Avatar.column || nextRow != Avatar.row){
                if(nextColumn>=0 && nextRow>=0 && nextColumn<ROOM_COLUMNS && nextRow<ROOM_ROWS){
                    Avatar.bumpColumn = null;
                    Avatar.bumpRow = null;
                    let cell = Rooms.getCell(Avatar.room, nextColumn, nextRow);
                    if(Cells.isBlocking(cell)){
                        if(Cells.isLocked(cell)){
                            let key = Cells.getKey(cell);
                            if(Avatar.hasInventory(key)){
                                Avatar.removeInventory(key);
                                //TODO: make sound
                                Rooms.setCell(Avatar.room, nextColumn, nextRow,Cells.unlock(cell));
                            }
                        }
                        Avatar.bumpColumn = nextColumn;
                        Avatar.bumpRow = nextRow;
                        nextColumn = Avatar.column;
                        nextRow = Avatar.row;
                    }else if (Cells.isExit(cell)){
                        let exit = Rooms.getExit(Avatar.room,nextColumn,nextRow);
                        if(exit!=null){
                            if(!Rooms.isRoomLit(Avatar.room)){
                                if(Avatar.hasInventory(CELL_TORCH)){
                                    Avatar.removeInventory(CELL_TORCH,1);
                                }
                            }
                            Avatar.room = exit.toRoom;
                            Avatar.bumpColumn = null;
                            Avatar.bumpRow = null;
                            nextColumn=exit.toColumn;
                            nextRow = exit.toRow;
                            //TODO: play a sound!
                        }
                    }else if(Cells.isItem(cell)){
                        Avatar.addInventory(cell);
                        Rooms.setCell(Avatar.room,nextColumn,nextRow,CELL_FLOOR);
                        //TODO: play a sound!
                    }
                    Avatar.column=nextColumn;
                    Avatar.row=nextRow;
                }
            }
            Input.reset();
        }
    }
    static drawMap(){
        let oldCell = Rooms.getCell(Avatar.room,Avatar.column,Avatar.row);
        Rooms.setCell(Avatar.room,Avatar.column,Avatar.row,CELL_AVATAR);
        for(let row=0;row<ROOM_ROWS;++row){
            for(let column=0;column<ROOM_COLUMNS;++column){
                let x = Plotter.plotRoomX(column,row);
                let y = Plotter.plotRoomY(column,row);
                let cell = Rooms.getCell(Avatar.room,column,row);
                let sprite = Cells.getSprite(cell);
                if(!Rooms.isLit(Avatar.room, column, row) && cell!=CELL_AVATAR){
                    sprite = SPRITE_DARKNESS;
                }
                if(sprite!=null){
                    Sprites.render(sprite,x,y);
                }
            }
        }
        Rooms.setCell(Avatar.room,Avatar.column,Avatar.row,oldCell);
    }
    static drawZoom(){
        let bumpCell = "";
        if(Avatar.bumpColumn!=null){
            bumpCell = Rooms.getCell(Avatar.room, Avatar.bumpColumn, Avatar.bumpRow);
        }
        if(Cells.isSign(bumpCell)){
            Sprites.render(SPRITE_SIGN_BIG,ZOOM_OFFSET_X,ZOOM_OFFSET_Y);
            let sign = Rooms.getSign(Avatar.room,Avatar.bumpColumn,Avatar.bumpRow);
            textAlign(CENTER,CENTER);
            textSize(SIGNTEXT_SIZE);
            fill(SIGNTEXT_COLOR);
            if(sign!=null){
                text(sign.text,ZOOM_OFFSET_X+SIGNTEXT_OFFSET_X,ZOOM_OFFSET_Y+SIGNTEXT_OFFSET_Y,SIGNTEXT_WIDTH,SIGNTEXT_HEIGHT);
            }
        }else{
            Sprites.render(SPRITE_CONTROLS_BIG,ZOOM_OFFSET_X,ZOOM_OFFSET_Y);
        }
    }
    static drawInventory(){
        Sprites.render(SPRITE_INVENTORY_PANEL, INVENTORY_PANEL_X, INVENTORY_PANEL_Y);
        let inventoryCells = Avatar.getInventoryCells();
        for(let index in inventoryCells){
            let cell = inventoryCells[index];
            Sprites.render(Cells.getSprite(cell),Plotter.plotInventoryX(index),Plotter.plotInventoryY(index));
        }
    }
    static draw(){
        background(BACKGROUND_COLOR);
        Game.drawMap();
        Game.drawZoom();
        Game.drawInventory();
    }
}