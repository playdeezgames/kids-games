let keyStates={};

class Input{
    static handleKeyPress(keyCode){
        keyStates[keyCode]=true;
    }
    static handleKeyRelease(keyCode){
        keyStates[keyCode]=false;
    }
    static isKeyPressed(keyCode){
        return keyStates[keyCode] || false;
    }
}