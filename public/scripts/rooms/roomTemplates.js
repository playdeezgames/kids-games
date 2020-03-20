let roomTemplates = {};
class RoomTemplates{
    static load(){
        roomTemplates[ROOM_START]=loadJSON('assets/templates/rooms/start.json');
        roomTemplates[ROOM_NORTH_HALL]=loadJSON('assets/templates/rooms/northHall.json');
        roomTemplates[ROOM_EAST_HALL]=loadJSON('assets/templates/rooms/eastHall.json');
        roomTemplates[ROOM_SOUTH_HALL]=loadJSON('assets/templates/rooms/southHall.json');
        roomTemplates[ROOM_WEST_HALL]=loadJSON('assets/templates/rooms/westHall.json');
        roomTemplates[ROOM_OUTSET]=loadJSON('assets/templates/rooms/outset.json');
    }
    static copyTemplate(roomId){
        return Utility.copy(roomTemplates[roomId]);
    }
}