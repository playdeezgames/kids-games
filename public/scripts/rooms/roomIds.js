let roomIds = {};
class RoomIds{
    static load(callback){
        roomIds = loadJSON('assets/templates/rooms/roomIds.json',callback);//TODO: magic string
    }
    static get ids(){
        let result = [];
        for(let room in roomIds){
            result.push(room);
        }
        return result;
    }
}