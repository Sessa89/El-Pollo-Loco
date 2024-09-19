class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 2200;

    constructor(e, c, b, co) {
        this.enemies = e;
        this.clouds = c;
        this.backgroundObjects = b;
        this.collectableObjects = co;
    }
}