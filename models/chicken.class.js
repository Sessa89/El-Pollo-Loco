class Chicken extends MoveableObject {
    y = 360;
    height = 50;
    width = 50;
    energy = 1;
    died = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 350 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;
        
        this.animate();
    }


    /**
     * This function animates the chickens.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        setInterval(() => this.playChickenAnimation(), 100);
    }


    /**
     * This function plays the animation of the chickens.
     */
    playChickenAnimation() {
        if (this.isDead()) {
            this.died = true;
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}