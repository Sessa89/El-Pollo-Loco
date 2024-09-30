class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();     // this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);    // Bild wird eingefügt (nicht gespiegelt / gespiegelt)
    }

    // Hitbox
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // bessere Hitbox
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            // ctx.strokeStyle = 'transparent';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.right,
                this.y + this.offset.top,
                this.width - (this.offset.right + this.offset.left),
                this.height - (this.offset.top + this.offset.bottom)
            );
            ctx.stroke();
        }
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
}