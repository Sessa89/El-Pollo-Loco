class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png')
    ];
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);

        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });

        this.backgroundObjects.forEach(bgo => {
            this.addToMap(bgo);
        });

        /* this.draw();        // Funktion wiederholt sich in Endlosschleife => Computer stürzt vermutlich ab! */
        
        // Draw() wird immer wieder aufgerufen => Wiederholungsrate abhängig von der Grafikkarte
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });       

    }

    // "mo" = moveable-object
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}