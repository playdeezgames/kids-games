const SPRITE_AVATAR = "avatar";
const SPRITE_WALL = "wall";
const SPRITE_SIGN = "sign";
const SPRITE_WOOD_DOOR = "wood-door";
const SPRITE_SIGN_BIG = "sign-big";
const SPRITE_CONTROLS_BIG = "controls-big"
let spriteImages = {

}
class Sprites{
    static load(){
        spriteImages[SPRITE_AVATAR] = loadImage('assets/images/meeple.png');
        spriteImages[SPRITE_WALL] = loadImage('assets/images/brick-wall.png');
        spriteImages[SPRITE_SIGN] = loadImage('assets/images/wooden-sign-32.png');
        spriteImages[SPRITE_SIGN_BIG] = loadImage('assets/images/wooden-sign-320.png');
        spriteImages[SPRITE_CONTROLS_BIG] = loadImage('assets/images/controls-320.png');
        spriteImages[SPRITE_WOOD_DOOR] = loadImage('assets/images/wooden-door.png');
    }
    static render(sprite,x,y){
        image(spriteImages[sprite],x,y);
    }
}