let keyStates={};
class Input{
    static handleKeyPress(keyCode){
        keyStates[keyCode]=true;
    }
    static isKeyPressed(keyCode){
        return keyStates[keyCode] || false;
    }
    static clear(){
        keyStates={};
    }
}