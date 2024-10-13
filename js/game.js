let canvas;
let world;
let keyboard = new Keyboard();
const sfx = {
    background_sound: Object.assign(document.createElement('Audio'), {
        src: './audio/music.mp3',
        loop: true,
        volume: 0.6
    })
}
let backgroundSoundOn = false;

let startScreenActive = true;

const icons = {
    home: { src: './img/0_sonstiges/app img_house.svg', x: 160, y: 20, width: 40, height: 40, onClick: showStartScreen },
    play: { src: './img/0_sonstiges/app img_play.svg', x: 220, y: 20, width: 40, height: 40, onClick: startGame },
    tutorial: { src: './img/0_sonstiges/app img_circle-info.svg', x: 280, y: 20, width: 40, height: 40, onClick: showTutorial },
    gamepad: { src: './img/0_sonstiges/app img_gamepad.svg', x: 340, y: 20, width: 40, height: 40, onClick: showControls },
    speaker: { src: './img/0_sonstiges/app img_volume-xmark.svg', x: 400, y: 20, width: 40, height: 40, onClick: toggleBackgroundMusic },
    fullscreen: { src: './img/0_sonstiges/app img_expand.svg', x: 460, y: 20, width: 40, height: 40, onClick: fullscreen },
    refresh: { src: './img/0_sonstiges/app img_rotate-right-solid.svg', x: 520, y: 20, width: 40, height: 40, onClick: refreshGame }
}

function init() {
    canvas = document.getElementById('canvas');
    drawStartScreen();

    canvas.addEventListener('click', handleIconClick);
}

function showStartScreen() {
    drawStartScreen();
}

function startGame() {
    startScreenActive = false;
    world = new World(canvas, keyboard);
    drawGame();
}

function handleIconClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    Object.values(icons).forEach(icon => {
        if (x >= icon.x && x <= icon.x + icon.width && y >= icon.y && y <= icon.y + icon.height) {
            icon.onClick();
        }
    });
}

function drawStartScreen() {
    let ctx = canvas.getContext('2d');
    let bgImage = new Image();
    bgImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        drawIcons();
    };
}

function drawIcons() {
    let ctx = canvas.getContext('2d');
    Object.values(icons).forEach(icon => {
        let img = new Image();
        img.src = icon.src;
        img.onload = () => ctx.drawImage(img, icon.x, icon.y, icon.width, icon.height);
    });
}

function drawGame() {
    if (!startScreenActive) {
        world.draw();
        let ctx = canvas.getContext('2d');
        drawIcons(ctx);
    }
}

function showTutorial() {
    alert("Sammle Münzen und wirf Flaschen auf Gegner!");
}

function showControls() {
    alert("Steuerung: Pfeiltasten zum Bewegen, Leertaste zum Springen, D zum Werfen.");
}

function refreshGame() {
    location.reload();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
        icons.fullscreen.src = 'img/0_sonstiges/app img_compress.svg';
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
        icons.fullscreen.src = 'img/0_sonstiges/app img_compress.svg';
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
        icons.fullscreen.src = 'img/0_sonstiges/app img_compress.svg';
    }

    drawStartScreen();
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function playBackgroundMusic() {
    backgroundSoundOn = true;
    sfx.background_sound.play();
    icons.speaker.src = './img/0_sonstiges/app img_volume-high.svg';
}

function pauseBackgroundMusic() {
    backgroundSoundOn = false;
    sfx.background_sound.pause();
    icons.speaker.src = './img/0_sonstiges/app img_volume-xmark.svg';
}

function isBackgroundMusicOn() {
    return backgroundSoundOn;
}

function toggleBackgroundMusic() {
    if (isBackgroundMusicOn()) {
        pauseBackgroundMusic();
    } else {
        playBackgroundMusic();
    }

    drawStartScreen();
}