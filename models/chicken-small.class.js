class ChickenSmall extends MoveableObject {
    static smallChickenIDCounter = 0;
    id;
    y = 370;
    height = 40;
    width = 40;
    energy = 1;
    died = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.id = ChickenSmall.smallChickenIDCounter++;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 350 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }


    /**
     * This function animates the small chickens.
     */
    animate() {
        intervalManager.setInterval(`chickenSmallMovementInterval-${this.id}`, () => this.moveLeft(), 1000 / 60);
        intervalManager.setInterval(`chickenSmallAnimationInterval-${this.id}`, () => this.playChickenSmallAnimation(), 100);
    }


    /**
     * This function stops the animation of the small chicken.
     */
    stopAnimation() {
        intervalManager.clearIntervalByName(`chickenSmallMovementInterval-${this.id}`);
        intervalManager.clearIntervalByName(`chickenSmallAnimationInterval-${this.id}`);
    }


    /**
     * This function plays the animation of the small chickens.
     */
    playChickenSmallAnimation() {
        if (this.isDead()) {
            this.died = true;
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}