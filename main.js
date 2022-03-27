
let plr, plrSpritedata, plrSpritesheet;
const MANAGER = new Game();

function preload() {
    MANAGER.preload();
}

function setup() {
    if(config.canvasSize.windowSize) {
        createCanvas(windowWidth, windowHeight);
    } else {
        createCanvas(config.canvasSize.width, config.canvasSize.height);
    }

    // Loading player
    plrSpritedata = spritesheetData.Player;
    plrSpritesheet = loadImage('./assets/spritesheets/player.png');
    plr = new Player(30, height/2);
    const plrSprite = plr.bindSprite(1, plrSpritesheet, plrSpritedata);
    plrSprite.bindToEnt(plr);
    plrSprite.setScale(80, 160);
    plr.setup();
    MANAGER.addGameEntity(plr);
    MANAGER.setup();
}

function draw() {
    background(0);
    // push();
    MANAGER.update();
    // pop();

    fill(255, 0, 100);
    // let dn = plrSpritesheet.get(0, 0, 50, 50);
    // image(dn, 0, 0)
}

// function keyPressed() {
//     // plr.onKeyPressed(key);
// }

function keyReleased() {
    plr.onKeyReleased(key);
}