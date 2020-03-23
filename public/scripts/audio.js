let sounds = {};
class Audio{
    static load(){
        soundFormats('ogg');
        loadJSON("assets/templates/audio.json",(data)=>{
            for(let key in data){
                sounds[key]=loadSound(data[key]);
            }
        });
    }
    static play(sound){
        if(sounds[sound]!=null){
            sounds[sound].play();
        }
    }
}