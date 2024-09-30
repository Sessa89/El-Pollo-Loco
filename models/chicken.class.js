class Chicken extends MoveableObject {
    y = 370;
    height = 50;
    width = 50;
    energy = 1;

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

        this.x = 350 + Math.random() * 1500;     // Zahl zwischen 350 und 1850 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        this.speed = 0.15 + Math.random() * 0.25;
        
        this.animate();
    }

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);  // 60 fps
        setInterval(() => this.playChickenAnimation(), 100);
    }

    playChickenAnimation() {
        if (this.isDead()) {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}