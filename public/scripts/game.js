const FRAME_RATE = 30;
const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 640;
const BACKGROUND_COLOR = "#555555";
const SIGNTEXT_COLOR = "#000000";
const INVENTORYTEXT_COLOR = "#008080";
const THREATTEXT_COLOR = "#000000"
const UPDATE_TIMER = 200;
let updateTimer = 0;
class Game{
    static preload(){
        Sprites.load();
        Cells.load();
        //TODO: preload roomids, and on success RoomData and RoomTemplates
        RoomIds.load((data)=>{
            RoomData.load(data);
            RoomTemplates.load(data);
        });
        Avatar.load();
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
            if(Avatar.alive){
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
                        let threat = Rooms.getThreatLevel(Avatar.room, nextColumn, nextRow);
                        if(Cells.isBlocking(cell)){
                            if(Cells.isLocked(cell)){//TODO: make lock into interaction?
                                let key = Cells.getKey(cell);
                                if(Avatar.hasInventory(key)){
                                    Avatar.removeInventory(key);
                                    //TODO: make sound
                                    Rooms.setCell(Avatar.room, nextColumn, nextRow,Cells.unlock(cell));
                                }
                            }else if(Cells.isTrigger(cell)){
                                //bump trigger
                                Rooms.activateTriggers(Avatar.room, nextColumn, nextRow);
                            }else if(Cells.canInteract(cell)){
                                if(Cells.meetsInteractionRequirements(cell)){
                                    let newCell = Cells.interact(cell);
                                    if(newCell!=null){
                                        Rooms.setCell(Avatar.room ,nextColumn, nextRow, newCell);
                                    }
                                    //TODO: succeed interaction
                                }else{
                                    //TODO: fail interaction
                                }
                            }else if(Cells.isCreature(cell)){
                                if(Avatar.hasInventory(CELL_BROADSWORD)){//TODO: make creature into interaction?
                                    //TODO: kill monster sound
                                    Rooms.setCell(Avatar.room, nextColumn,nextRow, CELL_FLOOR);
                                    Avatar.removeInventory(CELL_BROADSWORD);
                                }
                            }
                            Avatar.bumpColumn = nextColumn;
                            Avatar.bumpRow = nextRow;
                            nextColumn = Avatar.column;
                            nextRow = Avatar.row;
                            threat = 0;
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
                                nextColumn = exit.toColumn;
                                nextRow = exit.toRow;
                                threat = 0;
                                //TODO: play a travel sound!
                            }
                        }else if(Cells.isTrigger(cell)){
                            Rooms.activateTriggers(Avatar.room, nextColumn, nextRow);
                        }else if(Cells.isItem(cell)){
                            Avatar.addInventory(cell);
                            Rooms.setCell(Avatar.room,nextColumn,nextRow,CELL_FLOOR);
                            //TODO: play an item pickup sound!
                        }
                        if(threat>0){
                            Avatar.applyThreat(threat);
                            //TODO: get hit sound
                        }
                        Avatar.eat();
                        Avatar.column=nextColumn;
                        Avatar.row=nextRow;
                    }
                }
                Input.reset();
            }else{
                //avatar dead
                if(Input.wasKeyPressed(82)){
                    Game.reset();
                }
            }
        }
    }
    static drawMap(){
        let oldCell = Rooms.getCell(Avatar.room,Avatar.column,Avatar.row);
        Rooms.setCell(Avatar.room,Avatar.column,Avatar.row,Avatar.cell);
        for(let row=0;row<ROOM_ROWS;++row){
            for(let column=0;column<ROOM_COLUMNS;++column){
                let x = Plotter.plotRoomX(column,row);
                let y = Plotter.plotRoomY(column,row);
                let threat = Rooms.getThreatLevel(Avatar.room, column,row);
                if(threat>0){
                    Sprites.render(SPRITE_THREAT,x,y);
                    textAlign(CENTER,CENTER);
                    textSize(THREATTEXT_SIZE);
                    fill(THREATTEXT_COLOR);
                    text(String(threat),x,y,ROOM_COLUMN_WIDTH,ROOM_ROW_HEIGHT);
                }
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
        if(!Avatar.alive){
            Sprites.render(SPRITE_COFFIN_BIG,ZOOM_OFFSET_X,ZOOM_OFFSET_Y);
            textAlign(CENTER,CENTER);
            textSize(SIGNTEXT_SIZE);
            fill(SIGNTEXT_COLOR);
            text("GAME OVER!\nPress R to restart.",ZOOM_OFFSET_X+SIGNTEXT_OFFSET_X,ZOOM_OFFSET_Y+SIGNTEXT_OFFSET_Y,SIGNTEXT_WIDTH,SIGNTEXT_HEIGHT);
        }else if(Cells.isSign(bumpCell)){
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
            let x = Plotter.plotInventoryX(index);
            let y = Plotter.plotInventoryY(index);
            Sprites.render(Cells.getSprite(cell), x, y);
            textAlign(RIGHT, BOTTOM);
            textSize(INVENTORYTEXT_SIZE);
            fill(INVENTORYTEXT_COLOR);
            text(String(Avatar.getInventory(cell)),x,y,INVENTORY_COLUMN_WIDTH, INVENTORY_ROW_HEIGHT);
        }
    }
    static drawHealth(){
        for(let index=0;index<AVATAR_MAXIMUM_HEALTH;++index){
            let sprite = SPRITE_HEART_EMPTY;
            if(index<Avatar.health){
                sprite = SPRITE_HEART_FULL;
            }
            Sprites.render(sprite, Plotter.plotHealthX(index), Plotter.plotHealthY(index));
        }
    }
    static drawEnergy(){
        for(let index=0;index<AVATAR_MAXIMUM_ENERGY;++index){
            let sprite = SPRITE_ENERGY_EMPTY;
            if(index<Avatar.energy){
                sprite = SPRITE_ENERGY_FULL;
            }
            Sprites.render(sprite, Plotter.plotEnergyX(index), Plotter.plotEnergyY(index));
        }
    }
    static draw(){
        background(BACKGROUND_COLOR);
        Game.drawMap();
        Game.drawZoom();
        Game.drawInventory();
        Game.drawHealth();
        Game.drawEnergy();
    }
}