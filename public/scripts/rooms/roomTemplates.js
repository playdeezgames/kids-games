let roomTemplates = {};
class RoomTemplates{
    static load(data){
        for(let room in data){
            roomTemplates[room] = loadJSON(data[room].template);
        }
    }
    static copyTemplate(roomId){
        return Utility.copy(roomTemplates[roomId]);
    }
}