let sounds = {};
class Audio{
    static load(){
        soundFormats('ogg');//TODO: magic string
        loadJSON("assets/templates/audio.json",(data)=>{//TODO: magic string
            for(let key in data){
                sounds[key]=loadSound(data[key]);
            }
        });
    }
    static play(sound){
        if(sound!=null && sounds[sound]!=null){
            sounds[sound].play();
        }
    }
}