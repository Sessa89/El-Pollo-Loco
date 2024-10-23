class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };


    /**
     * This function is for applying gravity.
     */
    applyGravity() {
        intervalManager.setInterval('applyGravityInterval', () => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This function stops applying gravity.
     */
    stopApplyingGravity() {
        intervalManager.clearIntervalByName('applyGravityInterval');
    }


    /**
     * This function checks if a moveable object is above the ground.
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140;
        }
    }


    /**
     * This function checks if moveable objects are colliding with each other.
     * @param {string} mo - Moveable object
     * @returns true or false
     */
    isColliding(mo) {
        mo.offset = mo.offset || { top: 0, right: 0, bottom: 0, left: 0 };
        this.offset = this.offset || { top: 0, right: 0, bottom: 0, left: 0 };

        return this.x + this.width - this.offset.right > mo.x + mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * This function checks if a moveable object is colliding with the top of another moveable object.
     * @param {string} mo - Moveable object
     * @returns true or false
     */
    isCollidingTop(mo) {
        return this.y + this.height >= mo.y &&
            this.x < mo.x + mo.width &&
            this.x + this.width > mo.x;
    }


    /**
     * This function is for hitting a moveable object.
     */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }


    /**
     * This function checks if a moveable object is hurt.
     * @returns the passed time of the last hit
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * This function checks if a moveable object is dead.
     * @returns true or false
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function plays the animation of a moveable object.
     * @param {object} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This function moves the moveable object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function moves the moveable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function lets the moveable object jump.
     */
    jump() {
        this.speedY = 30;
    }
}