class Bottle extends CollectableObject {
    
    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Bilder müssen noch ständig gewechselt werden
    }

    // Überschreibt die onCollect Methode, um Flaschen zur Anzahl der Wurfobjekte hinzuzufügen.
    onCollect() {
        super.onCollect();
        world.character.bottles += 1;  // Füge eine Flasche hinzu, wenn sie gesammelt wird
        console.log('Bottle collected! Bottles: ' + world.character.bottles);
    }
}