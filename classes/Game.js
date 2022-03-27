let IMAGES_TO_PRELOAD = {
    coin: {
        source: "./assets/images/coin.gif",
    }
}

function Game() {
    this.time = 0;
    this.entities = [];
    this.entityMap = {}
    this.coins = [];
    this.paused = false;
    this.points = 0;

    this.preload = function() {
        for(let item in IMAGES_TO_PRELOAD) {
            IMAGES_TO_PRELOAD[item].image = loadImage(IMAGES_TO_PRELOAD[item].source);
        }
        this.mapGenerator = new MapGenerator();
        this.mapGenerator.preload();
    }

    this.spawnCoins = function() {
        // Move this func to CoinManager later
        if(floor(random(0,10)) == 4 && this.coins.length <= 20) {
            let xPos = random(plr.x + this.mapGenerator.sourceImg.width, this.mapGenerator.sourceImg.width*2);
            let yPos = map(random(), 0, 1, 30, height-30);
            let coin = new Coins(xPos, yPos);
            this.coins.push(coin);
        }
    }

    this.setup = function() {
        this.mapGenerator.setup();
    }

    this.update = function() {
        this.time += 1/config.frameCount;
        this.mapGenerator.show();
        this.mapGenerator.update();
        this.spawnCoins();
        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].show();
            this.entities[i].update();
        }
        for(let i = 0; i < this.coins.length; i++) {
            if(this.coins[i].collected) {
                this.points++;
            }
            if(this.coins[i].collected || this.coins[i].position.x < -30) {
                this.coins.splice(i, 1);
                continue;
            }
            this.coins[i].show();
            this.coins[i].update();
        }
    }

    this.addGameEntity = function(ent) {
        this.entities.push(ent);
        this.entityMap[ent.getEntityName()] = this.entities.length - 1;
    }

    this.removeGameEntity = function(ent) {
        const pos = this.entityMap[ent.getEntityName()];
        this.entities.splice(pos, 1);
    }
}