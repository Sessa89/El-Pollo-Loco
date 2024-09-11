class Chicken extends MoveableObject {
    y = 370;
    height = 50;
    width = 50;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 350 + Math.random() * 500;     // Zahl zwischen 350 und 850 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        this.speed = 0.15 + Math.random() * 0.25;
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);          // 60 fps
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}