const MAP_DATA = {
    biomeProximity: ["beach", "icelands", "marshlands"],
    scenes: {
        beach: {
            source: "./assets/backgrounds/beach.png",
            cut: {
                x: 0,
                widthCut: true
            },
            padding: {
                y: 160
            },
            scale: {
                width: 1,
                height: 1
            },
        },
        icelands: {
            source: "./assets/backgrounds/icelands.png",
            cut: {
                x: 0,
                widthCut: true
            },
            scale: {
                width: 2,
                height: 2
            },
            padding: {
                y: 100
            }
        },
        marshlands: {
            source: "./assets/backgrounds/marshlands.png",
            cut: {
                x: 530,
                widthCut: true
            },
            scale: {
                width: 2,
                height: 2
            },
            padding: {
                y: 160
            }
        }

    }
}

function MapGenerator() {

    this.currentScene = 0;
    this.scrollSpeed = config.scrollSpeed;
    this.sceneCuts = [];
    this.sceneCutIndex = 0;
    this.bg1X = 0;
    this.time = MANAGER.time;
    this.bg1Switch = false;
    this.bg2Switch = true;
    this.setScene = true;
    this.bg1Switched = true;
    this.bg2Switched = true;

    this.preload = function() {
        for(let sceneName in MAP_DATA.scenes) {
            let data = MAP_DATA.scenes[sceneName];
            let asset = loadImage(data.source);
            data.image = asset;
        }
    }

    this.setup = function() {
        for(let sceneName in MAP_DATA.scenes) {
            let data = MAP_DATA.scenes[sceneName];
            data.image.resize(data.image.width * data.scale.width, data.image.height * data.scale.height)
        }
        if(MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut) {
            let sceneVal = MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]]
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
        if((MANAGER.time - this.time) >= config.levelFrequency && this.bg2Switch && this.setScene) {
            this.currentScene = floor(random(0,3))
            this.time = MANAGER.time;
            this.setScene = false;
            this.bg1Switched = false;
            this.bg2Switched = false;
        }
        if(MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut && this.setScene == false) {
            this.sourceImg = MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].image
            this.mapWidth = this.sourceImg.width-MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x;
            let img = this.sourceImg.get(0,0, this.sourceImg.width-MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x, this.sourceImg.height);
            if(this.bg1Switch) {
                this.sceneCuts[0] = img;
                this.bg1Switched = true;
            }
            let img2 = this.sourceImg.get(0, 0, this.sourceImg.width-MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].cut.x, this.sourceImg.height);
            this.bg2X = img.width;
            if(this.bg2Switch) {
                this.sceneCuts[1] = img2;
                this.bg2Switched = true;
            }
            if(this.bg1Switched && this.bg2Switched) {
                this.setScene = true;
            }
        }
    }

    this.show = function() {
        let padY = MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].padding ? MAP_DATA.scenes[MAP_DATA.biomeProximity[this.currentScene]].padding.y : 0;
        image(this.sceneCuts[0], this.bg1X, height - this.sourceImg.height + padY);
        image(this.sceneCuts[1], this.bg2X, height - this.sourceImg.height + padY);
    }

    this.update = function() {
        this.bg1X -= this.scrollSpeed;
        this.bg2X -= this.scrollSpeed;

        if(this.bg1X <= -this.mapWidth) {
            this.bg1X = this.mapWidth;
            this.bg1Switch = true;
        } else {
            this.bg2Switch = false;
        }

        if(this.bg2X <= -this.mapWidth) {
            this.bg2X = this.mapWidth;
            this.bg2Switch = true;
        } else {
            this.bg2Switch = false;
        }
        this.chooseScene();
    }
}