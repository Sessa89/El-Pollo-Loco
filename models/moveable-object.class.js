class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();     // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {                           // Array wird in die Funktion gegeben (Strings/Pfade aber noch nicht wirkliche Bilder)
        arr.forEach((path) => {                 // Für jedes Element innerhalb des Arrays wird die Schleife ausgeführt (hier: 6x)
            let img = new Image();              // Variable "img" wird mit neuem Bild angelegt
            img.src = path;                     // Bild wird in das Image-Object geladen hinein, Bild kann somit in das Canvas eingefügt werden
            this.imageCache[path] = img;       // imageCache wird geupdated
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // "%" = Modulo-Operator = Rest; let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i];      // Beim ersten Durchlauf: currentImage = 0
        this.img = this.imageCache[path];       // 0. Bild wird geladen
        this.currentImage++;                    // currentImage wird erhöht => beim nächsten Durchlauf startet Intervall mit currentImage = 1
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);          // 60 fps
    }
}