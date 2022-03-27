const MAP_DATA = {
    biomeProximity: ["beach", "icelands", "marshalands"],
    "scenes": {
        "beach": {
            source: "./assets/backgrounds/beach.png",
            cut: {
                x: 0,
                widthCut: true
            },
            padding: {
                y: 160
            }
        },
        "icelands": {
            source: "./assets/backgrounds/icelands.png",
        },
        "marshlands": {
            source: "./assets/backgrounds/marshlands.png"
        }

    }
}

function MapGenerator() {

    this.currentScene = 0;
    this.scrollSpeed = config.scrollSpeed;
    this.sceneCuts = [];
    this.sceneCutIndex = 0;
    this.bg1X = 0;

    this.preload = function() {
        for(let sceneName in MAP_DATA.scenes) {
            let data = MAP_DATA.scenes[sceneName];
            let asset = loadImage(data.source);
            data.image = asset;
        }
    }

    this.setup = function() {
        if(MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut) {
            this.sourceImg = MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].image
            this.mapWidth = this.sourceImg.width;
            let img = this.sourceImg.get(0,0, this.sourceImg.width-MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x, this.sourceImg.height);
            this.sceneCuts.push(img)
            let img2 = this.sourceImg.get(MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x,0, MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x ? MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x : this.sourceImg.width, this.sourceImg.height);
            this.bg2X = img.width;
            this.sceneCuts.push(img2);
        }
    }

    this.chooseScene = function() {
        // Just setup func but randomizes choice
    }

    this.show = function() {
        let padY = MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].padding ? MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].padding.y : 0;
        image(this.sceneCuts[0], this.bg1X, height - this.sourceImg.height + padY);
        image(this.sceneCuts[1], this.bg2X, height - this.sourceImg.height + padY);
        // if(MAP_DATA.biomeProximity[this.currentScene].resizeParams) {
        //     background.resize(MAP_DATA.biomeProximity[this.currentScene].resizeParams.width, MAP_DATA.biomeProximity[this.currentScene].resizeParams.height);
        // }
    }

    this.update = function() {
        this.bg1X -= this.scrollSpeed;
        this.bg2X -= this.scrollSpeed;

        if(this.bg1X <= -this.mapWidth) {
            this.bg1X = this.mapWidth;
        }
        if(this.bg2X <= -this.mapWidth) {
            this.bg2X = this.mapWidth;
        }
    }
}