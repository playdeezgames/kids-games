const ROOM_START = "start";
const ROOM_NORTH_HALL = "northHall";
const ROOM_EAST_HALL = "eastHall";
const ROOM_WEST_HALL = "westHall";
const ROOM_SOUTH_HALL = "southHall";
class RoomIds{
    static get ids(){
        return [
            ROOM_START,
            ROOM_NORTH_HALL,
            ROOM_EAST_HALL,
            ROOM_SOUTH_HALL,
            ROOM_WEST_HALL
        ];
    }
}