let roomDatas = {};
class RoomData{
    static load(data){
        for(let room in data){
            roomDatas[room] = loadStrings(data[room].data);
        }
    }
    static getData(roomId){
        return roomDatas[roomId];
    }
}

