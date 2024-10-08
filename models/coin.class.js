class Coin extends CollectableObject {
    height = 125;
    width = 125;

    offset = {
        top: 40, 
        left: 40,
        right: 40,
        bottom: 40
    };

    coin_sound = new Audio('./audio/coin.mp3');

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./img/8_coin/coin_2.png');
    }

    muteSounds() {
        this.coin_sound.pause();

        this.coin_sound.currentTime = 0;
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
