class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 35;
    energy = 50;
    startX = 2500;
    speed = 25;
    alerted = false;
    characterEnteredBossArea = false;
    distanceToCharacter;
    walkingSoundPlaying = false;
    animationComplete = false;

    offset = {
        top: 60,
        left: 5,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    walking_sound = new Audio('./audio/endboss_walking.mp3');
    alert_sound = new Audio('./audio/alert.mp3');

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = this.startX;

        this.animate();
    }


    /**
     * This function mutes all sounds of the endboss.
     */
    muteSounds() {
        this.walking_sound.pause();
        this.alert_sound.pause();

        this.walking_sound.currentTime = 0;
        this.alert_sound.currentTime = 0;
    }


    /**
     * This function animates the endboss.
     */
    animate() {
        intervalManager.setInterval('endbossAnimationInterval', () => {
            this.updateDistanceToCharacter();
            this.playEndbossAnimation();
        }, 250);
    }


    /**
     * This function updates the distance to the character.
     */
    updateDistanceToCharacter() {
        if (world.character) {
            this.distanceToCharacter = Math.abs(this.x - world.character.x);
        }
    }


    /**
     * This function plays the animation of the endboss.
     */
    playEndbossAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (!this.alerted && this.CharacterEntersBossArea()) {
            this.playAlertAnimation();
        } else if (this.alerted && this.CharacterIsInRangeToAttack()) {
            this.playAttackAnimation();
        } else if (this.alerted && this.CharacterIsInFieldOfVision()) {
            this.playChaseAnimation();
        } else if (this.alerted && this.CharacterIsOutOfSight()) {
            this.playReturnToStartAnimation();
        }
    }


    /**
     * This function plays the dying animation of the endboss.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        
        setTimeout(() => {
            this.animationComplete = true;
        }, 2000);        
    }


    /**
     * This function plays the hurting animation of the endboss.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * This function plays the alerting animation of the endboss when the character enters the boss area.
     */
    playAlertAnimation() {
        this.alerted = true;
        this.characterEnteredBossArea = true;
        this.alert_sound.volume = 0.1;
        this.alert_sound.play();
        this.playAnimation(this.IMAGES_ALERT);
    }


    /**
     * This function plays the attacking animation of the endboss.
     */
    playAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACKING);
    }


    /**
     * This function plays the chasing animation of the endboss.
     */
    playChaseAnimation() {
        this.chaseCharacter();
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * This function plays the return-to-start animation of the endboss.
     */
    playReturnToStartAnimation() {
        this.returnToStart();
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * This function checks if the character is in field of vision.
     * @returns true or false
     */
    CharacterIsInFieldOfVision() {
        return this.distanceToCharacter <= 500;
    }


    /**
     * This function checks if the character is out of sight.
     * @returns true or false
     */
    CharacterIsOutOfSight() {
        return this.alerted && this.distanceToCharacter > 500;
    }


    /**
     * This function checks if the character is in range to attack.
     * @returns true or false
     */
    CharacterIsInRangeToAttack() {
        return this.distanceToCharacter <= 110;
    }


    /**
     * This function checks if the character entered the boss area.
     * @returns true or false
     */
    CharacterEntersBossArea() {
        return world.character.x >= 1900 && !this.alerted && !this.characterEnteredBossArea;
    }


    /**
     * This function lets the endboss chase the character.
     */
    chaseCharacter() {
        if (world.character.x < this.x) {
            this.moveLeft();
        } else if (world.character.x > this.x) {
            this.moveRight();
        }

        if (Math.random() <= 0.2 && !this.isJumping) { // chance of 20% that the endboss is jumping
            this.jumpTowardsCharacter();
        }
    }


    /**
     * This function lets the endboss jump towards the character.
     */
    jumpTowardsCharacter() {
        this.isJumping = true;

        const jumpHeight = 150;
        const jumpDuration = 1000;
        const jumpSpeed = jumpHeight / (jumpDuration / 50);

        const jumpDirection = this.getJumpDirection();
        const originalY = this.y;

        this.executeJump(jumpHeight, jumpSpeed, jumpDirection, originalY);
    }


    /**
     * This function checks in which direction the endboss have to jump to chase the character.
     * @returns -1 or 1
     */
    getJumpDirection() {
        return world.character.x < this.x ? -1 : 1;
    }


    /**
     * This function executes the jump of the endboss.
     * @param {number} jumpHeight - The height of the jump.
     * @param {number} jumpSpeed - The speed of the jump.
     * @param {number} jumpDirection - The direction of the jump.
     * @param {number} originalY - The original y-value.
     */
    executeJump(jumpHeight, jumpSpeed, jumpDirection, originalY) {
        let totalJumped = 0;

        intervalManager.setInterval('endbossJumpInterval', () => {
            if (totalJumped < jumpHeight) {
                this.performJump(jumpSpeed, jumpDirection);
                totalJumped += jumpSpeed;
            } else {
                this.fallDown(originalY);
                intervalManager.clearIntervalByName('endbossJumpInterval');
            }
        }, 20);
    }


    /**
     * This function performs the jump of the endboss.
     * @param {number} jumpSpeed - The speed of the jump.
     * @param {number} jumpDirection - The direction of the jump.
     */
    performJump(jumpSpeed, jumpDirection) {
        this.y -= jumpSpeed;
        this.x += jumpDirection * (jumpSpeed / 2);
    }


    /**
     * This function lets the endboss fall to the ground after jumping.
     */
    fallDown(originalY) {
        let fallSpeed = 10;
        intervalManager.setInterval('endbossFallInterval', () => {
            this.y += fallSpeed;
            if (this.y >= originalY) {
                this.y = originalY;
                intervalManager.clearIntervalByName('endbossFallInterval');
                this.isJumping = false;
            }
        }, 20);
    }


    /**
     * This function lets the endboss return to the start point.
     */
    returnToStart() {
        if (this.x < this.startX) {
            this.moveRight();
        } else if (this.x > this.startX) {
            this.moveLeft();
        } else {
            this.stopWalkingSound();
            this.otherDirection = false;
        }
    }


    /**
     * This function lets the endboss move to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
        this.playWalkingSound();
    }


    /**
     * This function lets the endboss move to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = true;
        this.playWalkingSound();
    }


    /**
     * This function plays the walking sound.
     */
    playWalkingSound() {
        if (!this.walkingSoundPlaying) {
            this.walking_sound.volume = 0.1;
            this.walking_sound.play();
            this.walkingSoundPlaying = true;
        }
    }


    /**
     * This function stops the walking sound.
     */
    stopWalkingSound() {
        if (this.walkingSoundPlaying) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
            this.walkingSoundPlaying = false;
        }
    }
}