class Coin extends CollectableObject {
    height = 125;
    width = 125;

    coin_sound = new Audio('../audio/coin.mp3');

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./img/8_coin/coin_2.png');
    }

    // Überschreibt die onCollect Methode, um spezifische Aktionen auszuführen, wenn eine Münze eingesammelt wird.
    onCollect() {
        super.onCollect();
        this.coin_sound.play();
        
        let newPercentage = Math.min(world.collectableObjectBar.percentage + 10, 100);
        world.collectableObjectBar.setPercentage(newPercentage);

        console.log('Coin collected! Score: ' + world.collectableObjectBar.percentage);
    }
}
