class Bottle extends CollectableObject {
    y = 350;
    height = 75;
    width = 75;

    offset = {
        top: 20,    // 10
        left: 30,   // 10
        right: 30,  // 10
        bottom: 10   // 5
    };

    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor(x) {
        super();
        this.x = 350 + Math.random() * 1500;     // Zahl zwischen 350 und 1850 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        
        let randomImage = this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)];
        this.loadImage(randomImage);
    }

    
    /**
     * This function overwrites the "onCollect"-method of the "collectable object"-class in order to push the collectable objects, e. g. bottle, to the throwable objects. 
     */
    onCollect() {
        super.onCollect();

        world.throwableObjects.push(new ThrowableObject());

        let newPercentage = Math.min(world.throwableObjects.length * 10, 100);
        world.throwableObjectBar.setPercentage(newPercentage);
    }
}