function Coins(x,y) {
    this.position = createVector(x,y);
    this.collected = false;

    this.handlePoints = function() {
        const xRange = plr.x + plr.sprite.spriteWidth;
        const yRange = plr.y + plr.sprite.spriteHeight;
        if(plr.x == this.position.x || (xRange >= this.position.x && plr.x <= this.position.x)) {
            if(plr.y == this.position.y || (yRange >= this.position.y && plr.y <= this.position.y)) {
                this.collected = true;
            }
        }
    }

    this.show = function() {
        if(!this.collected) {
            image(IMAGES_TO_PRELOAD.coin.image, this.position.x, this.position.y, 70, 70);
        }
    }

    this.update = function() {
        this.handlePoints();
        this.position.sub(config.scrollSpeed, 0);
    }
}