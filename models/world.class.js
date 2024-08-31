class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }    
            })
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);   // Kamera zurückschieben
        // ----- Space for fixed objects -----
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);   // Kamera vorschieben

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        /* this.draw();        // Funktion wiederholt sich in Endlosschleife => Computer stürzt vermutlich ab! */
        // Draw() wird immer wieder aufgerufen => Wiederholungsrate abhängig von der Grafikkarte
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {      // "mo" = moveable-object
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);        

        if (mo.otherDirection) {    // Einstellungen des Contexts werden resettet bzw. rückgängig gemacht damit nachfolgende Bilder nicht gespiegelt eingefügt werden
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();                    // aktuelle Einstellungen vom Context werden gespeichert
        this.ctx.translate(mo.width, 0);    // Änderung der Methode wie Bilder eingefügt werden => translate() = Verschiebung
        this.ctx.scale(-1, 1);              // Bilder werden gespiegelt an der Y-Achse => scale() = Spiegelung
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}