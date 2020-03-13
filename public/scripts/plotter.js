const ROOM_COLUMN_WIDTH = 32;
const ROOM_ROW_HEIGHT = 32;
const ROOM_OFFSET_X = 0;
const ROOM_OFFSET_Y = 0;
const ROOM_COLUMNS = 20;
const ROOM_ROWS = 20;
const ZOOM_OFFSET_X = ROOM_OFFSET_X + ROOM_COLUMNS * ROOM_COLUMN_WIDTH;
const ZOOM_OFFSET_Y = ROOM_OFFSET_Y;
const ZOOM_WIDTH = 320;
const ZOOM_HEIGHT = 320;
const SIGNTEXT_OFFSET_X = 20;
const SIGNTEXT_OFFSET_Y = 60;
const SIGNTEXT_WIDTH = 240;
const SIGNTEXT_HEIGHT = 140;
const SIGNTEXT_SIZE = 32;
class Plotter{
    static plotRoomX(column,row){
        return column * ROOM_COLUMN_WIDTH + ROOM_OFFSET_X;
    }
    static plotRoomY(column,row){
        return row * ROOM_ROW_HEIGHT + ROOM_OFFSET_Y;
    }
}