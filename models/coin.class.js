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


    /**
     * This function mutes the sound of the collectable object.
     */
    muteSounds() {
        this.coin_sound.pause();

        this.coin_sound.currentTime = 0;
    }

    
    /**
     * This function overwrites the "onCollect"-method of the "collectable object"-class. 
     */
    onCollect() {
        super.onCollect();
        this.coin_sound.volume = 0.05;
        this.coin_sound.play();
        
        let newPercentage = Math.min(world.collectableObjectBar.percentage + 10, 100);
        world.collectableObjectBar.setPercentage(newPercentage);
    }
}
