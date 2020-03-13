const SPRITE_AVATAR = "avatar";
const SPRITE_WALL = "wall";
const SPRITE_LEFT_ARROW = "left-arrow";
const SPRITE_RIGHT_ARROW = "right-arrow";
const SPRITE_UP_ARROW = "up-arrow";
const SPRITE_DOWN_ARROW = "down-arrow";
const SPRITE_SIGN = "sign";
const SPRITE_SIGN_BIG = "sign-big";
const SPRITE_CONTROLS_BIG = "controls-big"
let spriteImages = {

}
class Sprites{
    static load(){
        spriteImages[SPRITE_AVATAR] = loadImage('assets/images/meeple.png');
        spriteImages[SPRITE_WALL] = loadImage('assets/images/brick-wall.png');
        spriteImages[SPRITE_LEFT_ARROW] = loadImage('assets/images/plain-arrow-left.png');
        spriteImages[SPRITE_RIGHT_ARROW] = loadImage('assets/images/plain-arrow-right.png');
        spriteImages[SPRITE_UP_ARROW] = loadImage('assets/images/plain-arrow-up.png');
        spriteImages[SPRITE_DOWN_ARROW] = loadImage('assets/images/plain-arrow-down.png');
        spriteImages[SPRITE_SIGN] = loadImage('assets/images/wooden-sign-32.png');
        spriteImages[SPRITE_SIGN_BIG] = loadImage('assets/images/wooden-sign-320.png');
        spriteImages[SPRITE_CONTROLS_BIG] = loadImage('assets/images/controls-320.png');
    }
    static render(sprite,x,y){
        image(spriteImages[sprite],x,y);
    }
}