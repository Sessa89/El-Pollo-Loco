class Cloud extends MoveableObject {
    static cloudIDCounter = 0;
    id;
    static resetIDCounter() {
        Cloud.cloudIDCounter = 0;
    }

    width = 500;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.id = Cloud.cloudIDCounter++;

        this.x = Math.random() * 2200;
        this.y = Math.random() * 25;
        this.speed = 0.05 + Math.random() * 0.1;
        this.animate();
    }

    
    /**
     * This function animates the background object, e. g. clouds.
     */
    animate() {
        intervalManager.setInterval(`cloudMovementInterval-${this.id}`, () => this.moveLeft(), 1000 / 60); 
    }


    /**
     * This function stops the animation of the cloud.
     */
    stopAnimation() {
        intervalManager.clearIntervalByName(`cloudMovementInterval-${this.id}`);
    }
}