class Bottle extends CollectableObject {
    y = 350;

    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor(x) {
        super();
        this.x = 350 + Math.random() * 1500;     // Zahl zwischen 350 und 1850 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Bilder müssen noch ständig gewechselt werden
    }

    // Überschreibt die onCollect Methode, um Flaschen zur Anzahl der Wurfobjekte hinzuzufügen.
    onCollect() {
        super.onCollect();
        world.character.bottles += 1;  // Füge eine Flasche hinzu, wenn sie gesammelt wird
        console.log('Bottle collected! Bottles: ' + world.character.bottles);
    }
}