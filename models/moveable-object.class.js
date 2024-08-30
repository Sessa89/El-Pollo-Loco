class MoveableObject extends DrawableObject {  
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

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

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;   // Difference in ms
        timepassed = timepassed / 1000;     // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // "%" = Modulo-Operator = Rest; let i = 0 % 6; => 0, Rest 0
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