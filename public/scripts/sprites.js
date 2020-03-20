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
const SPRITE_DARKNESS = "darkness";
const SPRITE_CAT = "cat";
const SPRITE_FISHBONE = "fishbone";
const SPRITE_MAGIC_PORTAL = "magic-portal";
const SPRITE_HEART_FULL = "heart-full";
const SPRITE_HEART_EMPTY = "heart-empty";
const SPRITE_LEVER_GREEN = "lever-green";
const SPRITE_LEVER_RED = "lever-red";
const SPRITE_MINION = "bully-minion";
const SPRITE_BROADSWORD = "broadsword";
const SPRITE_SHIELD = "checked-shield";
const SPRITE_THREAT = "threat-level";
const SPRITE_CHICKEN_LEG = "chicken-leg";
const SPRITE_HEALTH_POTION = "health-potion";
const SPRITE_COFFIN = "coffin";
const SPRITE_TREE = "tree";

const SPRITE_SIGN_BIG = "sign-big";
const SPRITE_CONTROLS_BIG = "controls-big";
const SPRITE_COFFIN_BIG = "coffin-big";
const SPRITE_INVENTORY_PANEL = "inventory-panel";

let spriteImages = {

};
class Sprites{
    static load(){
        spriteImages[SPRITE_TREE]              = loadImage('assets/images/pine-tree.png');
        spriteImages[SPRITE_CHICKEN_LEG]       = loadImage('assets/images/chicken-leg.png');
        spriteImages[SPRITE_HEALTH_POTION]     = loadImage('assets/images/health-potion.png');
        spriteImages[SPRITE_COFFIN]            = loadImage('assets/images/coffin.png');
        spriteImages[SPRITE_COFFIN_BIG]        = loadImage('assets/images/coffin-320.png');
        spriteImages[SPRITE_THREAT]            = loadImage('assets/images/crossed-swords.png');
        spriteImages[SPRITE_MINION]            = loadImage('assets/images/bully-minion.png');
        spriteImages[SPRITE_BROADSWORD]        = loadImage('assets/images/broadsword.png');
        spriteImages[SPRITE_SHIELD]            = loadImage('assets/images/checked-shield.png');
        spriteImages[SPRITE_LEVER_GREEN]       = loadImage('assets/images/lever-green.png');
        spriteImages[SPRITE_LEVER_RED]         = loadImage('assets/images/lever-red.png');
        spriteImages[SPRITE_HEART_FULL]        = loadImage('assets/images/hearts-full.png');
        spriteImages[SPRITE_HEART_EMPTY]       = loadImage('assets/images/hearts-empty.png');
        spriteImages[SPRITE_AVATAR]            = loadImage('assets/images/meeple.png');
        spriteImages[SPRITE_WALL]              = loadImage('assets/images/brick-wall.png');
        spriteImages[SPRITE_SIGN]              = loadImage('assets/images/wooden-sign-32.png');
        spriteImages[SPRITE_WOOD_DOOR]         = loadImage('assets/images/wooden-door.png');
        spriteImages[SPRITE_WOOD_DOOR_CYAN]    = loadImage('assets/images/padlock-cyan.png');
        spriteImages[SPRITE_WOOD_DOOR_MAGENTA] = loadImage('assets/images/padlock-magenta.png');
        spriteImages[SPRITE_WOOD_DOOR_YELLOW]  = loadImage('assets/images/padlock-yellow.png');
        spriteImages[SPRITE_KEY_CYAN]          = loadImage('assets/images/key-cyan.png');
        spriteImages[SPRITE_KEY_MAGENTA]       = loadImage('assets/images/key-magenta.png');
        spriteImages[SPRITE_KEY_YELLOW]        = loadImage('assets/images/key-yellow.png');
        spriteImages[SPRITE_TORCH]             = loadImage('assets/images/torch.png');
        spriteImages[SPRITE_DARKNESS]          = loadImage('assets/images/darkness.png');
        spriteImages[SPRITE_CAT]               = loadImage('assets/images/cat.png');
        spriteImages[SPRITE_FISHBONE]          = loadImage('assets/images/fishbone.png');
        spriteImages[SPRITE_MAGIC_PORTAL]      = loadImage('assets/images/magic-portal.png');

        spriteImages[SPRITE_SIGN_BIG]          = loadImage('assets/images/wooden-sign-320.png');
        spriteImages[SPRITE_CONTROLS_BIG]      = loadImage('assets/images/controls-320.png');
        spriteImages[SPRITE_INVENTORY_PANEL]   = loadImage('assets/images/inventory-panel.png');
    }
    static render(sprite,x,y){
        image(spriteImages[sprite],x,y);
    }
}