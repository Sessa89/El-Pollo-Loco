const map1 = [
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/1.png',
    './img/5_background/layers/2_second_layer/1.png',
    './img/5_background/layers/1_first_layer/1.png'
];

const map2 = [
    './img/5_background/layers/air.png',
    './img/5_background/layers/3_third_layer/2.png',
    './img/5_background/layers/2_second_layer/2.png',
    './img/5_background/layers/1_first_layer/2.png'
];

const mapPositions = [-719, 0, 719, 719 * 2, 719 * 3];

const level1 = new Level(
    [...createEnemies()],
    [...createBackgroundObjects()],
    [...createCollectableObjects()],
    [...createMaps([map1, map2], mapPositions)]
);

function createEnemies() {
    let enemies = [];

    enemies.push(...createFirstEnemyType(5));   // creating x enemies of the first type (x = count)
    enemies.push(...createSecondEnemyType(5));  // creating x enemies of the second type (x = count)
    enemies.push(new Endboss());                // creating one endboss

    return enemies;
}

function createFirstEnemyType(count) {
    let enemies = [];

    for (let i = 0; i < count; i++) {
        enemies.push(new Chicken());
    }

    return enemies;
}

function createSecondEnemyType(count) {
    let enemies = [];

    for (let i = 0; i < count; i++) {
        enemies.push(new ChickenSmall());
    }

    return enemies;
}

function createBackgroundObjects() {
    let backgroundObjects = [];

    backgroundObjects.push(...createFirstBackgroundObject(4));  // creating x background objects of the first type (x = count)

    return backgroundObjects;
}

function createFirstBackgroundObject(count) {
    let backgroundObject = [];

    for (let i = 0; i < count; i++) {
        backgroundObject.push(new Cloud());
    }

    return backgroundObject;
}

function createMaps(mapGroup, mapPositions) {
    let maps = [];

    for (let i = 0; i < mapPositions.length; i++) {
        let currentMap = mapGroup[i % mapGroup.length];

        for (let j = 0; j < currentMap.length; j++) {
            maps.push(new BackgroundObject(currentMap[j], mapPositions[i]));
        }
    }

    return maps;
}

function createCollectableObjects() {
    let collectables = [];

    collectables.push(...createBottles(10));            // creating x bottles (x = count)

    collectables.push(...createCoinRow(400, 100, 3));   // creating a row of coins (startX, y, count)
    collectables.push(...createCoinRow(1800, 300, 3));  // creating a row of coins (startX, y, count)

    collectables.push(...createCoinParabola(1200, 200, 5, 300, 150, 0.5));  // creating a parabolic curve of coins (startX, startY, count, width, height, flatness)

    return collectables;
}

function createBottles(count) {
    let bottles = [];

    for (let i = 0; i < count; i++) {
        bottles.push(new Bottle());
    }

    return bottles;
}

function createCoinRow(startX, y, count) {
    let coins = [];

    for (let i = 0; i < count; i++) {
        let xPosition = startX + i * 50;        // coins in a distance of 50px
        coins.push(new Coin(xPosition, y));
    }

    return coins;
}

function createCoinParabola(startX, startY, count, width, height, flatness = 1) {
    let coins = [];
    let midPoint = Math.floor(count / 2);

    for (let i = 0; i < count; i++) {
        let xPosition = startX + (i * width / count);  // x-position for an even distribution
        let yPosition = startY + Math.pow(i - midPoint, 2) * (height / Math.pow(midPoint, 2)) * flatness;   // y-position for a mirrored, flat parabola

        coins.push(new Coin(xPosition, yPosition));
    }

    return coins;
}
