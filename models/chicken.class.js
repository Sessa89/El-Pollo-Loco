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

        this.x = 200 + Math.random() * 500;     // Zahl zwischen 200 und 700 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        this.speed = 0.15 + Math.random() * 0.25;
        
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // "%" = Modulo-Operator = Rest; let i = 0 % 6; => 0, Rest 0
            // i = 0, 1, 2, 3, 4, 5, 0
            let path = this.IMAGES_WALKING[i];      // Beim ersten Durchlauf: currentImage = 0
            this.img = this.imageCache[path];       // 0. Bild wird geladen
            this.currentImage++;                    // currentImage wird erhöht => beim nächsten Durchlauf startet Intervall mit currentImage = 1
        }, 100);
    }
}