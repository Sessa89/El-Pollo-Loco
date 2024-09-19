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
    [...createBackgroundObjects(4)],
    [...createMaps([map1, map2], mapPositions)],
    [...createCollectableObjects(10)]
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

function createBackgroundObjects(firstBackgroundObjectCount) {
    let backgroundObjects = [];
    
    for (let i = 0; i < firstBackgroundObjectCount; i++) {
        backgroundObjects.push(new Cloud());
    }
    
    return backgroundObjects;
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

function createCollectableObjects(firstCollectableObjectCount) {
    let collectables = [];

    for (let i = 0; i < firstCollectableObjectCount; i++) {
        collectables.push(new Bottle());
    }

    collectables.push(new Coin(300, 100));
    collectables.push(new Coin(500, 150));
    collectables.push(new Coin(800, 200));

    return collectables;
}