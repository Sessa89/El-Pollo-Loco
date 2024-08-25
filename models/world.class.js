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
        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);


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

    // "mo" = moveable-object
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);    // Bild wird eingefügt (nicht gespiegelt / gespiegelt)

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