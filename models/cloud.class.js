class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 2200;   // Zahl zwischen 0 und 2200 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus        
        this.animate();
    }

    // alle 60 Bilder pro Sekunde wird die x-Koordinate um 0.15 Pixel verringert
    animate() {
        this.moveLeft();
    }
}