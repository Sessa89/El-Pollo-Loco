class Bottle extends CollectableObject {
    y = 350;
    height = 75;
    width = 75;

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

    // Überschreibt die onCollect Methode, um Flaschen zur Anzahl der Wurfobjekte hinzuzufügen.
    onCollect() {
        super.onCollect();

        world.throwableObjects.push(new ThrowableObject());

        let newPercentage = Math.min(world.throwableObjects.length * 10, 100);
        world.throwableObjectBar.setPercentage(newPercentage);

        console.log('Bottle collected! Bottles: ' + ((world.throwableObjectBar.percentage) / 10));
    }
}