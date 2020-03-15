

let rooms = {};
class Rooms{
    static reset(){
        rooms = {
            start: {
                lit: true,
                data: Rooms.convertToLevelData(RoomData.start),
                signs: [
                    {column:3,row:17,text:'This is a sign! Signs give you hints what to do next!'},
                    {column:9,row:9,text:'Most of these doors look locked, but what about that one to the right?'}
                ],
                exits: [
                    {fromColumn:13,fromRow:0,toRoom:'northHall',toColumn:13,toRow:18},
                    {fromColumn:19,fromRow:7,toRoom:'eastHall',toColumn:1,toRow:7},
                    {fromColumn:8,fromRow:19,toRoom:'southHall',toColumn:8,toRow:1},
                    {fromColumn:0,fromRow:14,toRoom:'westHall',toColumn:18,toRow:14}
                ]
            },
            northHall: {
                lit: true,
                data: Rooms.convertToLevelData(RoomData.northHall),
                signs: [
                    {column:14,row:17,text:'Now this is just ridiculous!'}
                ],
                exits: [
                    {fromColumn:13,fromRow:19,toRoom:'start',toColumn:13,toRow:1}
                ]
            },
            eastHall: {
                lit: true,
                data: Rooms.convertToLevelData(RoomData.eastHall),
                signs: [
                    {column:2,row:6,text:'Hey, look! A key! Way over there...'}
                ],
                exits: [
                    {fromColumn:0,fromRow:7,toRoom:'start',toColumn:18,toRow:7}
                ]
            },
            southHall: {
                lit: true,
                data: Rooms.convertToLevelData(RoomData.southHall),
                signs: [
                    {column:9,row:11,text:'(This game is a WIP. This is as far as it goes, for now!)'}
                ],
                exits: [
                    {fromColumn:8,fromRow:0,toRoom:'start',toColumn:8,toRow:18}
                ]
            },
            westHall: {
                lit: false,
                data: Rooms.convertToLevelData(RoomData.westHall),
                signs: [
                    {column:17,row:13,text:'It\'s dark in here! Better find a light source!'},
                    {column:9,row:11,text:'Hey! A torch!'},
                    {column:11,row:15,text:'Wonder what this key opens?'},
                    {column:8,row:18,text:'*ANOTHER* locked door?'}
                ],
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
    static isRoomLit(room){
        return rooms[room].lit;
    }
    static isLit(room,column,row){
        if(Rooms.isRoomLit(room)){
            return true;
        }else{
            for(let dx = -2;dx<=2;++dx){
                for(let dy = -2; dy<=2;++dy){
                    let x = column + dx;
                    let y = row + dy;
                    if(x>0 && y>0 && x<ROOM_COLUMNS && y<ROOM_ROWS){
                        if(Cells.isLit(Rooms.getCell(room,x,y),dx,dy)){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}