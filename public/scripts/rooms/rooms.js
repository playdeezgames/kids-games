const TRIGGERTYPE_SWITCH = "switch";
const TRIGGERTYPE_TOGGLE = "toggle";
let rooms = {};
class Rooms{
    static reset(){
        rooms = {};
        for(let k in RoomIds.ids){
            let roomId = RoomIds.ids[k];
            rooms[roomId] = RoomTemplates.copyTemplate(roomId);
            rooms[roomId].data = Rooms.convertToLevelData(RoomData.getData(roomId));
        }
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
    static activateTriggers(room,column,row){
        if(rooms[room].triggers!=null){
            let triggers = rooms[room].triggers;
            if(triggers!=null && triggers.sources!=null && triggers.sinks!=null){
                let triggered = {};
                for(let index in triggers.sources){
                    let source = triggers.sources[index];
                    if(source.column==column && source.row==row){
                        let energyCost = source.energyCost || 0;
                        if(energyCost>Avatar.energy){
                            //TODO: not enough energy sound
                        }else{
                            //TODO: triggered energy sound
                            Avatar.energy -= energyCost;
                            triggered[source.name]=true;
                        }
                    }
                }
                for(let index in triggers.sinks){
                    let sink = triggers.sinks[index];
                    if(triggered[sink.name]){
                        if(sink.type==TRIGGERTYPE_SWITCH){
                            Rooms.setCell(room,sink.column,sink.row,sink.value);
                        }else if(sink.type==TRIGGERTYPE_TOGGLE){
                            let old = Rooms.getCell(room, sink.column, sink.row);
                            Rooms.setCell(room,sink.column,sink.row,sink.value);
                            sink.value = old;
                        }
                    }
                }
            }
        }
    }
    static getThreatLevel(room,column,row){
        if(column<0 || row<0 || column>=ROOM_COLUMNS || row>=ROOM_ROWS || Cells.isBlocking(Rooms.getCell(room,column,row))){
            return 0;
        }else{
            let level = 0;
            if(column>0){
                level += Cells.getThreatLevel(Rooms.getCell(room,column-1,row));
            }
            if(row>0){
                level += Cells.getThreatLevel(Rooms.getCell(room,column,row-1));
            }
            if(column<ROOM_COLUMNS-1){
                level += Cells.getThreatLevel(Rooms.getCell(room,column+1,row));
            }
            if(row<ROOM_ROWS-1){
                level += Cells.getThreatLevel(Rooms.getCell(room,column,row+1));
            }
            return level;
        }
    }
}