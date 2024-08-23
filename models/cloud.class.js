class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;   // Zahl zwischen 0 und 500 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
        this.animate();
    }

    // alle 60 Bilder pro Sekunde wird die x-Koordinate um 0.15 Pixel verringert
    animate() {
        setInterval( () => {
            this.x -= 0.15;
        }, 1000 / 60);          // 60 fps
    }
}