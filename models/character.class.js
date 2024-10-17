class Character extends MoveableObject {
    height = 280;
    width = 150;
    y = 80;
    speed = 5;
    lastKeyPressTime = new Date();
    idleTimeout = 15000;

    offset = {
        top: 110,
        left: 30,
        right: 20,
        bottom: 10
    };

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    walking_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    snoring_sound = new Audio('./audio/snoring.mp3');
    waking_up_sound = new Audio('./audio/waking_up.mp3');
    hurt_sound = new Audio('./audio/hurt.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * This function mutes all sounds of the character.
     */
    muteSounds() {
        this.walking_sound.pause();
        this.jumping_sound.pause();
        this.snoring_sound.pause();
        this.waking_up_sound.pause();
        this.hurt_sound.pause();

        this.walking_sound.currentTime = 0;
        this.jumping_sound.currentTime = 0;
        this.snoring_sound.currentTime = 0;
        this.waking_up_sound.currentTime = 0;
        this.hurt_sound.currentTime = 0;
    }


    /**
     * This function animates the character.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 100);
    }


    /**
     * This function is for moving the character.
     */
    moveCharacter() {
        this.walking_sound.pause();
        let keyUsed = false;

        if (this.canMoveRight()) {
            this.moveRight();
            keyUsed = true;
        }

        if (this.canMoveLeft()) {
            this.moveLeft();
            keyUsed = true;
        }

        if (this.canJump()) {
            this.jump();
            keyUsed = true;
        }

        if (keyUsed) {
            this.lastKeyPressTime = new Date();
        }

        this.world.camera_x = -this.x + 100;
    }


    /**
     * This function checks if the character is able to move right.
     * @returns true or false
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * This function moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }


    /**
     * This function checks if the character is able to move left.
     * @returns true or false
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * This function moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }


    /**
     * This function checks if the character is able to jump.
     * @returns true or false
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    /**
     * This function lets the character jump.
     */
    jump() {
        super.jump();
        this.jumping_sound.play();
    }


    /**
     * This function plays the animation of the character.
     */
    playCharacterAnimation() {
        let currentTime = new Date();
        let timeSinceLastKeyPress = currentTime - this.lastKeyPressTime;

        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.hurt_sound.play();
            this.hurt_sound.volume = 0.8;
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (timeSinceLastKeyPress > this.idleTimeout) {
            this.playAnimation(this.IMAGES_LONG_IDLE)
            this.snoring_sound.play();
            this.snoring_sound.volume = 0.5;
        } else {
            this.snoring_sound.pause();
            this.waking_up_sound.play();
            this.waking_up_sound.pause();
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}