function Player(x, y) {
    // Inheritance
    Entity.call(this);

    // Players
    this.x = x;
    this.y = y;
    this.gravity = config.gravity;
    this.force = 0.5;
    this.velocity = 0;
    this.flying = false;

    this.setup = function() {
        this.setState("neutralFly");
    }

    this.show = function() {
        if(this.sprite) {
            this.sprite.show();
        }
    }

    this.getObjectName = function() {
        return "Player";
    }

    this.update = function() {
        // Inputs
        this.onKeyDown()

        // State Management
        this.handleStateToAnimation();

        // Update
        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y >= height) {
            this.y = height;
            this.velocity = 0; 
        }
        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
        if(this.sprite) {
            this.sprite.update();
        }
    }

    // this.onKeyPressed = function(key) {
    //     if(key == ' ') {
    //         this.velocity -= this.force;
    //     }
    // }

    this.onKeyDown = function() {
        if(keyIsDown(32)) {
            this.flying = true;
            this.velocity -= this.force;
        }
    }

    this.onKeyReleased = function(key) {
        if(key == ' ') {
            this.velocity = -2;
            this.flying = false;
        }
    }
}