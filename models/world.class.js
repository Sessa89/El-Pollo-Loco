class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bossAreaStartX = 1900;      // look for "CharacterEntersBossArea()" in "endboss.class.js"

    healthBar = new HealthBar();
    collectableObjectBar = new CollectableObjectBar();
    throwableObjectBar = new ThrowableObjectBar();
    endbossHealthBar = new EndbossHealthBar();

    throwableObjects = [];

    coin = new Coin();
    bottle = new Bottle();

    gameOver = false;
    win = false;
    gameOverScreen;
    winScreen;
    gameOver_sound = new Audio('./audio/game_over.mp3');
    winning_sound = new Audio('./audio/win.mp3');

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.gameOverScreen = new GameScreen('./img/9_intro_outro_screens/game_over/game over!.png', 0, 0, 720, 480);
        this.winScreen = new GameScreen('./img/9_intro_outro_screens/win/win_2.png', 180, 80, 905 * 0.4, 879 * 0.4);

        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function sets the world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function runs setted intervals for the world.
     */
    run() {
        setInterval(() => {
            if (!this.gameOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkGameOver();
            }
        }, 50);

        setInterval(() => {
            if (!this.gameOver) {
                this.removeDeadEnemies();
            }
        }, 5000);
    }


    /**
     * This function mutes all sounds.
     */
    muteAllSounds() {
        this.character.muteSounds();
        this.level.enemies[this.level.enemies.length - 1].muteSounds();
        this.coin.muteSounds();

        if (isBackgroundMusicOn()) {
            pauseBackgroundMusic();
        }
    }


    /**
     * This function checks if a throwable object is thrown.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.throwableObjects.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.splice(0, 1);
            this.level.collectableObjects.push(bottle);
            this.throwableObjectBar.setPercentage(this.throwableObjects.length * 10);
        }
    }


    /**
     * This function checks all collisions.
     */
    checkCollisions() {
        this.checkCollisionsWithEnemies();
        this.checkCollisionsWithCollectableObjects();
        this.checkCollisionsWithThrowableObjects();
    }


    /**
     * This function checks the collisions with enemies.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingTop(enemy) && !enemy.died) {
                if (this.character.isAboveGround()) {
                    this.character.jump();
                    enemy.hit();
                } else {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * This function checks the collisions with collectable objects.
     */
    checkCollisionsWithCollectableObjects() {
        this.level.collectableObjects.forEach((collectableObject, index) => {
            if (collectableObject instanceof Coin || collectableObject instanceof Bottle) {
                if (this.character.isColliding(collectableObject)) {
                    collectableObject.collect(this.character);
                    this.level.collectableObjects.splice(index, 1);
                }
            }
        });
    }


    /**
     * This function checks the collision with throwable objects.
     */
    checkCollisionsWithThrowableObjects() {
        this.level.collectableObjects.forEach((object, objectIndex) => {
            if (object instanceof ThrowableObject) {
                this.level.enemies.forEach((enemy, enemyIndex) => {
                    if (object.isColliding(enemy)) {
                        enemy.hit();
                        this.level.collectableObjects.splice(objectIndex, 1);
                    }
                });

                let endboss = this.level.enemies[this.level.enemies.length - 1];
                if (object.isColliding(endboss)) {
                    endboss.hit();
                    this.level.collectableObjects.splice(objectIndex, 1);
                    this.endbossHealthBar.setPercentage(endboss.energy * 2);
                }
            }
        });
    }


    /**
     * This function removes dead enemies.
     */
    removeDeadEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.isDead()) {
                this.level.enemies.splice(index, 1);
            };
        });
    }


    /**
     * This function checks if the game is over.
     */
    checkGameOver() {
        let endboss = this.level.enemies[this.level.enemies.length - 1];

        if (endboss.energy <= 0) {
            this.gameOver = true;
            this.win = true;
        }

        if (this.character.energy <= 0) {
            this.gameOver = true;
            this.win = false;
        }
    }


    /**
     * This function displays the endscreen.
     */
    displayEndScreen() {
        this.muteAllSounds();

        if (this.win) {
            this.winning_sound.play();
            this.addToMap(this.winScreen);
        } else {
            this.gameOver_sound.play();
            this.addToMap(this.gameOverScreen);
        }
    }


    /**
     * This function draws objects on the canvas.
     * @returns objects
     */
    draw() {       
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.collectableObjectBar);
        this.addToMap(this.throwableObjectBar);

        if (this.character.x >= this.bossAreaStartX) {
            this.addToMap(this.endbossHealthBar);
        }

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);

        this.ctx.translate(-this.camera_x, 0);

        if (this.gameOver) {
            this.displayEndScreen();
            return;
        }

        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This function adds objects to the canvas.
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function adds moveable objects to the canvas.
     * @param {object} mo - Moveable object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawHitbox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function flips an image.
     * @param {object} mo - Moveable object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This function flips an image back.
     * @param {object} mo - Moveable object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}