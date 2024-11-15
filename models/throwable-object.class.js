class ThrowableObject extends MoveableObject {
    isBreaking = false;

    IMAGES_BOTTLE_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    breaking_glass_sound = new Audio('./audio/breaking_glass.mp3');

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.world = world;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(x, y);
    }


    /**
     * This function mutes the sound of the breaking bottle.
     */
    muteSounds() {
        this.breaking_glass_sound.pause();

        this.breaking_glass_sound.currentTime = 0;
    }


    /**
     * This function throws a throwable object.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        intervalManager.setInterval('throwInterval', () => this.x += 10, 25);
        intervalManager.setInterval('bottleAnimationInterval', () => this.playAnimation(this.IMAGES_BOTTLE_ROTATION), 80);
    }


    /**
     * This function stops the animation of the throw.
     */
    stopThrow() {
        intervalManager.clearIntervalByName('throwInterval');
        intervalManager.clearIntervalByName('bottleAnimationInterval');
    }




    break() {
        intervalManager.clearIntervalByName('throwInterval');
        intervalManager.clearIntervalByName('bottleAnimationInterval');
        this.isBreaking = true;
        this.speedY = 0;
        this.breaking_glass_sound.volume = 0.08;
        this.breaking_glass_sound.play();
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        
        setTimeout(() => {
            this.world.removeThrowableObject(this);
        }, 30);
    }
}