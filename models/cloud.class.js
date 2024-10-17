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
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
    }
}