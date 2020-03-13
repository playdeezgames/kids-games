
let roomDatas = {
    start:[
        "#########^##########",
        "#..................#",
        "#..................#",
        "#..............!...#",
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

let rooms = {};
class Rooms{
    static reset(){
        rooms = {
            start: {
                data: Rooms.convertToLevelData(roomDatas.start),
                signs: [
                    {row:3,column:15,text:'This is a sign.'}
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
}