class Character extends MoveableObject {
    height = 280;
    width = 150;
    y = 150;
    speed = 5;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('../audio/running.mp3');

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length; // "%" = Modulo-Operator = Rest; let i = 0 % 6; => 0, Rest 0
                // i = 0, 1, 2, 3, 4, 5, 0
                let path = this.IMAGES_WALKING[i];      // Beim ersten Durchlauf: currentImage = 0
                this.img = this.imageCache[path];       // 0. Bild wird geladen
                this.currentImage++;                    // currentImage wird erhöht => beim nächsten Durchlauf startet Intervall mit currentImage = 1
            }
        }, 100);
    }

    jump() {

    }
}