class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.05;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 2200;     
        this.animate();
    }

    
    /**
     * This function animates the background object, e. g. clouds.
     */
    animate() {
        intervalManager.setInterval('cloudMovementInterval', () => this.moveLeft(), 1000 / 60); 
    }


    /**
     * This function stops the animation of the cloud.
     */
    stopAnimation() {
        intervalManager.clearIntervalByName('cloudMovementInterval');
    }
}