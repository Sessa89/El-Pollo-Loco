class GameScreen extends DrawableObject {
    constructor(imgPath, x, y, width, height) {
        super().loadImage(imgPath);  
        this.width = width;  
        this.height = height;
        this.x = x;  
        this.y = y;
    }
}