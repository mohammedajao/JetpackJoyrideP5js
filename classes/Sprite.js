function Sprite(x,y,speed,spritesheet,spritedata) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.spritedata = spritedata;
    this.animations = {};
    this.currentAnimationState = "";
    this.speed = speed;
    this.entity = null;
    this.index = 0;

    this.bindToEnt = function(ent) {
        this.entity = ent;
        for(let spriteState in this.spritedata) {
            const frames = this.spritedata[spriteState].frames;
            this.animations[spriteState] = [];
            for(let i = 0; i < frames.length; i++) {
                let pos = frames[i].position;
                let img = this.spritesheet.get(pos.x, pos.y, pos.width, pos.height);
                this.animations[spriteState].push(img);
            }
        }
    }

    this.setScale = function(w, h) {
        this.scaleW = w;
        this.scaleH = h;
    }

    this.boundHeight = function() {
        if(this.y <= 0) {
            this.y = 0;
        } else if(this.y >= height - this.spriteHeight) {
            this.y = height - this.spriteHeight;
        }
        if(this.x >= width - this.spriteWidth) {
            this.x = width - this.spriteWidth;
        }
    }

    this.show = function() {
        let frames = this.spritedata[this.currentAnimationState].frames;
        let pos = frames[this.index % frames.length].position
        let img = this.spritesheet.get(pos.x, pos.y, pos.width, pos.height)
        if(this.scaleW && this.scaleH) {
            img.resize(this.scaleW, this.scaleH);
        }
        this.spriteWidth = img.width;
        this.spriteHeight = img.height;
        image(img, this.x, this.y);
        // image(img, this.x, this.y);
    }

    this.update = function() { // We'll also bind entity states to update sprites!
        if(this.entity) {
            this.x = this.entity.x;
            this.y = this.entity.y;
            this.currentAnimationState = this.entity.currentState;
        }
        this.boundHeight();
        this.index += this.speed;
    }



    this.setSpeed = function(val) {
        this.speed = val;
    }

    this.setState = function(str) {
        this.index = 0;
        this.currentAnimationState = str;
    }

    this.getState = function() { return this.currentAnimationState; }
}