let keyStates = {};
let keyPresses = {};
class Input{
    static reset(){
        keyPresses={};
    }
    static handleKeyPress(keyCode){
        keyStates[keyCode]=true;
        keyPresses[keyCode]=true;
    }
    static handleKeyRelease(keyCode){
        keyStates[keyCode]=false;
    }
    static wasKeyPressed(keyCode){
        return keyPresses[keyCode] || keyStates[keyCode] || false;
    }
}