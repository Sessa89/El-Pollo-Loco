class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    healthBar = new HealthBar();
    collectableObjectBar = new CollectableObjectBar();
    throwableObjectBar = new ThrowableObjectBar();
    endbossHealthBar = new EndbossHealthBar();

    throwableObjects = [];

    coin = new Coin();
    bottle = new Bottle();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.throwableObjects.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.splice(0, 1);
            this.level.collectableObjects.push(bottle);
            this.throwableObjectBar.setPercentage(this.throwableObjects.length * 10);
        }
    }

    checkCollisions() {
        this.checkCollisionsWithEnemies();
        this.checkCollisionsWithCollectableObjects();
        this.checkCollisionsWithThrowableObjects();
    }

    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isCollidingTop(enemy, index) && this.character.isAboveGround()) {
                    this.character.jump();
                    enemy.hit();
                    setTimeout(() => this.level.enemies.splice(index, 1), 2000);
                } else {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollisionsWithCollectableObjects() {
        this.level.collectableObjects.forEach((collectableObject, index) => {
            if (this.character.isColliding(collectableObject)) {
                collectableObject.collect(this.character);
                this.level.collectableObjects.splice(index, 1);
            }
        });
    }

    checkCollisionsWithThrowableObjects() {
        this.level.collectableObjects.forEach((object, objectIndex) => {
            if (object instanceof ThrowableObject) {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (object.isColliding(enemy)) {
                        enemy.hit();
                        setTimeout(() => this.level.enemies.splice(enemyIndex, 1), 2000);
                        this.level.collectableObjects.splice(objectIndex, 1);
                    }
                });

                if (object.isColliding(this.level.endboss)) {
                    this.level.endboss.hit();
                    this.level.collectableObjects.splice(objectIndex, 1);
                    this.endbossHealthBar.setPercentage(this.level.endboss.energy);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);   // Kamera zurückschieben
        // ----- Space for fixed objects -----
        this.addToMap(this.healthBar);
        this.addToMap(this.collectableObjectBar);
        this.addToMap(this.throwableObjectBar);
        this.addToMap(this.endbossHealthBar);

        this.ctx.translate(this.camera_x, 0);   // Kamera vorschieben

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);

        // this.addToMap(this.bottle);
        // this.addToMap(this.coin);

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