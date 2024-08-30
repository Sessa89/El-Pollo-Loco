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
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 140;
    }

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();     // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);    // Bild wird eingefügt (nicht gespiegelt / gespiegelt)
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        return  (this.x + this.width) >= mo.x && 
                (this.y + this.height) >= mo.y &&
                this.x <= mo.x &&
                this.y <= (mo.y + mo.height); 
         
        /*
        // Bessere Formel zur Kollisionsberechnung (Genauer)
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.offsetY + this.height) >= mo.y &&
                (this.y + this.offsetY) <= (mo.y + mo.height) && 
                mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        */
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
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}