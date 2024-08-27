class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(e, c, b) {
        this.enemies = e;
        this.clouds = c;
        this.backgroundObjects = b;
    }
}