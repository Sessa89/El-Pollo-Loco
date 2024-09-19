class Coin extends CollectableObject {
    height = 125;
    width = 125;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./img/8_coin/coin_2.png');
    }

    // Überschreibt die onCollect Methode, um spezifische Aktionen auszuführen, wenn eine Münze eingesammelt wird.
    onCollect() {
        super.onCollect();
        world.character.score += 10;  // Füge 10 Punkte hinzu, wenn die Münze gesammelt wird
        console.log('Coin collected! Score: ' + world.character.score);
    }
}
