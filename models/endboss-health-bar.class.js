class EndbossHealthBar extends DrawableObject {

    IMAGES_HEALTH = [
        './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 550;
        this.y = 6;
        this.width = 150;
        this.height = 45;
        this.otherDirection = true;
        this.setPercentage(100);
    }


    /**
     * This function sets the percentage of the health bar of the endboss depending on how many times the endboss has been hit by a throwable object. 
     * @param {number} percentage - The percentage for loading different
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This function resolves the index for specific image of the array depending on the setted percentage. 
     * @returns a number depending on the setted percentage
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}