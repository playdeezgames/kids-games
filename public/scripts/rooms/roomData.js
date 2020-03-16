let roomDatas = {};
class RoomData{
    static load(){
        roomDatas[ROOM_START]=loadStrings('assets/maps/start.csv');
        roomDatas[ROOM_NORTH_HALL]=loadStrings('assets/maps/northHall.csv');
        roomDatas[ROOM_EAST_HALL]=loadStrings('assets/maps/eastHall.csv');
        roomDatas[ROOM_SOUTH_HALL]=loadStrings('assets/maps/southHall.csv');
        roomDatas[ROOM_WEST_HALL]=loadStrings('assets/maps/westHall.csv');
    }
    static getData(roomId){
        return roomDatas[roomId];
    }
}

