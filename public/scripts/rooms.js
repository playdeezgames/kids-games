
let roomDatas = {
    start:[
        "#########+##########",
        "#..................#",
        "#..................#",
        "#..............!...#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................+",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "+..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#############+######"
      ],
    northHall:[
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#########+##########"
      ],
    southHall:[
        "#############+######",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################"
      ],
    eastHall:[
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "+..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################"
    ],
    westHall:[
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................+",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################"
    ]
};

let rooms = {};
class Rooms{
    static reset(){
        rooms = {
            start: {
                data: Rooms.convertToLevelData(roomDatas.start),
                signs: [
                    {row:3,column:15,text:'This is a sign.'}
                ],
                exits: [
                    {fromRow:7,fromColumn:19,toRoom:'eastHall',toRow:7,toColumn:1},
                    {fromRow:0,fromColumn:9,toRoom:'northHall',toRow:18,toColumn:9},
                    {fromRow:19,fromColumn:13,toRoom:'southHall',toRow:1,toColumn:13},
                    {fromRow:13,fromColumn:0,toRoom:'westHall',toRow:13,toColumn:18}
                ]
            },
            eastHall: {
                data: Rooms.convertToLevelData(roomDatas.eastHall),
                exits: [
                    {fromRow:7,fromColumn:0,toRoom:'start',toRow:7,toColumn:18}
                ]
            },
            northHall: {
                data: Rooms.convertToLevelData(roomDatas.northHall),
                exits: [
                    {fromRow:19,fromColumn:9,toRoom:'start',toRow:1,toColumn:9}
                ]
            },
            westHall: {
                data: Rooms.convertToLevelData(roomDatas.westHall),
                exits: [
                    {fromRow:13,fromColumn:19,toRoom:'start',toRow:13,toColumn:1}
                ]
            },
            southHall: {
                data: Rooms.convertToLevelData(roomDatas.southHall),
                exits: [
                    {fromRow:0,fromColumn:13,toRoom:'start',toRow:18,toColumn:13}
                ]
            }
        };
    }
    static convertToLevelData(lines){
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