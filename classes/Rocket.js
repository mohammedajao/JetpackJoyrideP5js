
let ROCKET_INST = 0;

function Rocket(seed) {
    ROCKET_INST++;
    this.instNum = ROCKET_INST;
    let y = random(0, height-30);
    this.scale = 2;
    this.state = "Warning";
    this.time = MANAGER.time;
    this.maxTime = floor(random(2,5))
    this.collided = false;
    if(seed) {
        y = map(noise(seed), 0, 1, 0, height-30);
    }
    this.pos = createVector(width + random(100, 300), y);

    this.show = function() {
        const decision = (this.state == "Warning");
        image(decision ? IMAGES_TO_PRELOAD.exclamation.image : IMAGES_TO_PRELOAD.rocket.image, decision ? width-120 : this.pos.x, this.pos.y, decision ? 60 : 170, decision ? 60 : 80);
    }

    this.update = function() {
        if(MANAGER.time - this.time >= this.maxTime) {
            this.state = "LAUNCHED";
        }
        if(this.state == "LAUNCHED") {
            this.pos.sub(config.scrollSpeed * this.scale, 0, 0);
        }
        this.checkCollision();
    }

    this.checkCollision = function() {
        if(plr.y == this.pos.y || plr.y + plr.sprite.spriteHeight >= this.pos.y+10 && plr.y <= this.pos.y-10) {
            if(plr.x == this.pos.x+30 || plr.x + plr.sprite.spriteWidth >= this.pos.x+30 && plr.x <= this.pos.x+30) {
                this.collided = true;
                MANAGER.endGame();
            }
        }
    }

    this.setScale = function(val) {
        this.scale = val;
    }

}