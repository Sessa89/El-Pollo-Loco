class CollectableObject extends DrawableObject {
    constructor() {
        super();
        this.isCollected = false;
    }

    // Diese Methode überprüft, ob das Objekt vom Charakter eingesammelt wurde.
    collect(character) {
        if (this.isColliding(character)) {
            this.isCollected = true;
            this.onCollect();
        }
    }

    // Diese Methode kann von den abgeleiteten Klassen überschrieben werden, um spezifische Aktionen beim Einsammeln auszuführen.
    onCollect() {
        console.log('Collectable object collected!');
    }

    // character.isColliding(chicken);
    isColliding(character) {
        return this.x <= character.x + character.width &&
            this.y <= character.y + character.height &&
            this.x + this.width >= character.x &&
            this.y + this.height >= character.y;

        /*
        // Bessere Formel zur Kollisionsberechnung (Genauer)
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.offsetY + this.height) >= mo.y &&
                (this.y + this.offsetY) <= (mo.y + mo.height) && 
                mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        */
    }
}