let IMAGES_TO_PRELOAD = {
    coin: {
        source: "./assets/images/coin.gif",
    },
    rocket: {
        source: "./assets/images/rocket.gif",
    },
    exclamation: {
        source: "./assets/images/exclamation.gif"
    }
}

function Game() {
    this.time = 0;
    this.entities = [];
    this.entityMap = {}
    this.coins = [];
    this.rockets = [];
    this.paused = false;
    this.ended = false;
    this.points = 0;

    this.preload = function() {
        for(let item in IMAGES_TO_PRELOAD) {
            IMAGES_TO_PRELOAD[item].image = loadImage(IMAGES_TO_PRELOAD[item].source);
        }
        this.mapGenerator = new MapGenerator();
        this.mapGenerator.preload();
        this.testImg = loadImage(IMAGES_TO_PRELOAD.exclamation.source)
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

    this.spawnRockets = function() {
        const chance = floor(random(0, frameCount*10));
        if(chance >= (frameCount*10)-min(this.time*config.rocketFrequency, 300)) {
            this.rockets.push(new Rocket());
        }
    }

    this.setup = function() {
        this.mapGenerator.setup();
    }

    this.showUI = function() {
        text("Points: " + this.points, 0, 30, 100, 100);
    }

    this.update = function() {
        if(this.paused || this.ended) {
            return;
        }
        this.time += 1/config.frameCount;
        this.mapGenerator.show();
        this.showUI();

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
        for(let i=0; i < this.rockets.length; i++) {
            if(this.rockets[i].pos.x < -100 || this.rockets[i].collided) {
                this.rockets.splice(i, 1);
                continue;
            }
            this.rockets[i].show();
            this.rockets[i].update();
        }
        if(this.rockets.length < 5) {
            this.spawnRockets();
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

    this.endGame = function() {
        this.paused = true;
        textSize(32);
        text("GAME ENDED", width/2, height/2)
    }
}