const SPRITE_AVATAR = "avatar";
const SPRITE_WALL = "wall";
const SPRITE_SIGN = "sign";
const SPRITE_WOOD_DOOR = "wood-door";
const SPRITE_WOOD_DOOR_CYAN = "wood-door-cyan";
const SPRITE_WOOD_DOOR_MAGENTA = "wood-door-magenta";
const SPRITE_WOOD_DOOR_YELLOW = "wood-door-yellow";
const SPRITE_KEY_CYAN = "key-cyan";
const SPRITE_KEY_MAGENTA = "key-magenta";
const SPRITE_KEY_YELLOW = "key-yellow";
const SPRITE_TORCH = "torch";

const SPRITE_SIGN_BIG = "sign-big";
const SPRITE_CONTROLS_BIG = "controls-big"
let spriteImages = {

}
class Sprites{
    static load(){
        spriteImages[SPRITE_AVATAR] = loadImage('assets/images/meeple.png');
        spriteImages[SPRITE_WALL] = loadImage('assets/images/brick-wall.png');
        spriteImages[SPRITE_SIGN] = loadImage('assets/images/wooden-sign-32.png');
        spriteImages[SPRITE_WOOD_DOOR] = loadImage('assets/images/wooden-door.png');
        spriteImages[SPRITE_WOOD_DOOR_CYAN] = loadImage('assets/images/padlock-cyan.png');
        spriteImages[SPRITE_WOOD_DOOR_MAGENTA] = loadImage('assets/images/padlock-magenta.png');
        spriteImages[SPRITE_WOOD_DOOR_YELLOW] = loadImage('assets/images/padlock-yellow.png');
        spriteImages[SPRITE_KEY_CYAN] = loadImage('assets/images/key-cyan.png');
        spriteImages[SPRITE_KEY_MAGENTA] = loadImage('assets/images/key-magenta.png');
        spriteImages[SPRITE_KEY_YELLOW] = loadImage('assets/images/key-yellow.png');
        spriteImages[SPRITE_TORCH] = loadImage('assets/images/torch.png');

        spriteImages[SPRITE_SIGN_BIG] = loadImage('assets/images/wooden-sign-320.png');
        spriteImages[SPRITE_CONTROLS_BIG] = loadImage('assets/images/controls-320.png');
    }
    static render(sprite,x,y){
        image(spriteImages[sprite],x,y);
    }
}