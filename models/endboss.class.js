class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    startX = 2500;
    speed = 10;
    alerted = false;
    characterEnteredBossArea = false;
    distanceToCharacter;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
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


    // ADDING AUDIO FILE
    walking_sound = new Audio('../audio/endboss_walking.mp3');
    hurt_sound = new Audio('');
    alert_sound = new Audio('../audio/alert.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = this.startX;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.updateDistanceToCharacter();
            this.playEndbossAnimation();
        }, 250);
    }

    updateDistanceToCharacter() {
        this.distanceToCharacter = Math.abs(this.x - world.character.x);
    }

    playEndbossAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            // hurt sound       this.hurt_sound.play();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.CharacterEntersBossArea()) {
            this.alerted = true;
            this.characterEnteredBossArea = true;
            this.alert_sound.play();
            this.playAnimation(this.IMAGES_ALERT);
            console.log('Endboss has been alerted!');
        } else if (this.CharachterIsInFieldOfVision()) {
            this.chaseCharacter();
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.CharacterIsInRangeToAttack()) {
            this.playAnimation(this.IMAGES_ATTACKING);
        } else if (this.CharacterIsOutOfSight()) {
            this.returnToStart();    
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            // 
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    CharachterIsInFieldOfVision() {
        return this.distanceToCharacter <= 500;
    }

    CharacterIsOutOfSight() {
        return this.alerted && this.distanceToCharacter > 500;
    }

    CharacterIsInRangeToAttack() {
        return this.distanceToCharacter <= 200;
    }

    CharacterEntersBossArea() {
        return world.character.x >= 1900 && !this.alerted && !this.characterEnteredBossArea;
    }

    chaseCharacter() {
        if (world.character.x < this.x) {
            this.moveLeft();
        } else if (world.character.x > this.x) {
            this.moveRight();
        }
    }

    returnToStart() {
        if (this.x < this.startX) {
            this.moveRight();
        } else if (this.x > this.startX) {
            this.moveLeft();
        } else {
            this.otherDirection = false;
        }
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
        this.walking_sound.play();
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = true;
        this.walking_sound.play();
    }
}