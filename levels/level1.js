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
    [...createEnemies(5, 5)],
    [...createFirstBackgroundObject(4)],
    [...createMaps([map1, map2], mapPositions)]
);

function createEnemies(firstEnemyCount, secondEnemyCount) {
    let enemies = [];
    
    for (let i = 0; i < firstEnemyCount; i++) {
        enemies.push(new Chicken());
    }
    
    for (let i = 0; i < secondEnemyCount; i++) {
        enemies.push(new ChickenSmall());
    }
    enemies.push(new Endboss());

    return enemies;
}

function createFirstBackgroundObject(number) {
    let firstBackgroundObject = [];
    
    for (let i = 0; i < number; i++) {
        firstBackgroundObject.push(new Cloud());
    }
    
    return firstBackgroundObject;
}

function createMaps(mapGroup, mapPositions) {
    let backgroundObjects = [];
    
    for (let i = 0; i < mapPositions.length; i++) {
        let currentMap = mapGroup[i % mapGroup.length];
        
        for (let j = 0; j < currentMap.length; j++) {
            backgroundObjects.push(new BackgroundObject(currentMap[j], mapPositions[i]));
        }
    }
    
    return backgroundObjects;
}