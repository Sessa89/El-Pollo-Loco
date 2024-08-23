class Chicken extends MoveableObject {
    
    y = 380;
    height = 50;
    width = 50;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;     // Zahl zwischen 200 und 700 => "Math.random()" gibt eine Zahl zwischen "0" und "1" aus
    }

}