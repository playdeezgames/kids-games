const START_COLUMN = 1;
const START_ROW = 18;
const START_ROOM = "start";
let avatar ={
    column: START_COLUMN,
    row: START_ROW,
    room: START_ROOM
};
class Avatar{
    static reset(){
        Avatar.column = START_COLUMN;
        Avatar.row = START_ROW;
        Avatar.room = START_ROOM;
    }
    static get column(){
        return avatar.column;
    }
    static set column(v){
        avatar.column = v;
    }
    static get row(){
        return avatar.row;
    }
    static set row(v){
        avatar.row = v;
    }
    static get room(){
        return avatar.room;
    }
    static set room(v){
        avatar.room = v;
    }
}