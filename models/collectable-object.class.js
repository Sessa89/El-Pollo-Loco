class CollectableObject extends DrawableObject {
    constructor() {
        super();
        this.height = 75;
        this.width = 75;
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
}