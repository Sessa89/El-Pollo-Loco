class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }


    /**
     * This function throws a throwable object.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        intervalManager.setInterval('throwInterval', () => this.x += 10, 25);
    }


    /**
     * This function stops the animation of the throw.
     */
    stopThrow() {
        intervalManager.clearIntervalByName('throwInterval');
    }
}