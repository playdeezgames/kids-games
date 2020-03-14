let roomDatas = {};
class RoomData{
    static load(){
        roomDatas.start = loadStrings('assets/maps/start.csv');
        roomDatas.northHall = loadStrings('assets/maps/northHall.csv');
        roomDatas.eastHall = loadStrings('assets/maps/eastHall.csv');
        roomDatas.southHall = loadStrings('assets/maps/southHall.csv');
        roomDatas.westHall = loadStrings('assets/maps/westHall.csv');
    }
    static get start(){
        return roomDatas.start;        
    }
    static get northHall(){
        return roomDatas.northHall;
    }
    static get eastHall(){
        return roomDatas.eastHall;
    }
    static get southHall(){
        return roomDatas.southHall;
    }
    static get westHall(){
        return roomDatas.westHall;
    }
}

