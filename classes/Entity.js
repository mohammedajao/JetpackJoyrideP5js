let ENT_NUM = 0;

function Entity() {
    ENT_NUM++;
    this.name = "Entity-" + ENT_NUM;
    this.currentState = "";
    this.setEntityName = function(str) {
        this.name = str;
    }
    this.getEntityName = function() {
        return this.name;
    }
    this.show = function() {}
    this.update = function() {}
    this.bindSprite = function(speed, spritesheet, spritedata) {
        this.spritesheet = spritesheet;
        this.spritedata = spritedata;
        this.sprite = new Sprite(0, 0, speed, spritesheet, spritedata);
        return this.sprite;
    }
    
    this.handleStateToAnimation = function() {
        if(this.sprite && this.sprite.currentAnimationState != this.currentState) {
            this.sprite.setState(this.currentState);
        }
    }

    this.setState = function(state) {
        if(this.currentState == "STUNNED") {

        } else if(this.currentState != state) {
            this.currentState = state;
            this.handleStateToAnimation();
        }
    }
}