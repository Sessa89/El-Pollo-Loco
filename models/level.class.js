class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 2200;

    constructor(e, c, co, b) {
        this.enemies = e;
        this.clouds = c;
        this.collectableObjects = co;
        this.backgroundObjects = b;
    }
}