class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;


    /**
     * This function loads an image.
     * @param {string} path - Relative path of an image 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function draws on the context.
     * @param {string} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    
    /**
     * This function draws a hit box for better adjustment of colliding moveable objects.
     * @param {string} ctx 
     */
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'transparent';
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
     * This function load all images of an array.
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}