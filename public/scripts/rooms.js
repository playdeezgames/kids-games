

let rooms = {};
class Rooms{
    static reset(){
        rooms = {
            start: {
                data: Rooms.convertToLevelData(RoomData.start),
                signs: [
                    {row:5,column:12,text:'This is a sign.'}
                ],
                exits: [
                    {fromColumn:13,fromRow:0,toRoom:'northHall',toColumn:13,toRow:18},
                    {fromColumn:19,fromRow:7,toRoom:'eastHall',toColumn:1,toRow:7},
                    {fromColumn:8,fromRow:19,toRoom:'southHall',toColumn:8,toRow:1},
                    {fromColumn:0,fromRow:14,toRoom:'westHall',toColumn:18,toRow:14}
                ]
            },
            northHall: {
                data: Rooms.convertToLevelData(RoomData.northHall),
                exits: [
                    {fromColumn:13,fromRow:19,toRoom:'start',toColumn:13,toRow:1}
                ]
            },
            eastHall: {
                data: Rooms.convertToLevelData(RoomData.eastHall),
                exits: [
                    {fromColumn:0,fromRow:7,toRoom:'start',toColumn:18,toRow:7}
                ]
            },
            southHall: {
                data: Rooms.convertToLevelData(RoomData.southHall),
                exits: [
                    {fromColumn:8,fromRow:0,toRoom:'start',toColumn:8,toRow:18}
                ]
            },
            westHall: {
                data: Rooms.convertToLevelData(RoomData.westHall),
                exits: [
                    {fromColumn:19,fromRow:14,toRoom:'start',toColumn:1,toRow:14}
                ]
            }
        };
    }
    static convertToLevelData(lines){
        let level = [];
        for(let row in lines){
            let line = lines[row];
            let levelRow = [];
            let tokens = line.split(',');
            for(let column=0;column<tokens.length;++column){
                levelRow.push(Number(tokens[column]));
            }
            level.push(levelRow);
        }
        return level;
    }    
    static getCell(room,column,row){
        return rooms[room].data[row][column];
    }
    static setCell(room,column,row,cell){
        rooms[room].data[row][column] = cell;
    }
    static getSign(room,column,row){
        if(rooms[room].signs!=null){
            for(let i in rooms[room].signs){
                let sign = rooms[room].signs[i];
                if(sign.column==column && sign.row==row){
                    return sign;
                }
            }
        }
        return null;
    }
    static getExit(room,column,row){
        if(rooms[room].exits!=null){
            for(let i in rooms[room].exits){
                let exit = rooms[room].exits[i];
                if(exit.fromColumn==column && exit.fromRow==row){
                    return exit;
                }
            }
        }
        return null;
    }
}