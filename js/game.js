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

function init() {
    canvas = document.getElementById('canvas');
    drawStartScreen();
}

function showStartScreen() {
    startScreenActive = true;
    drawStartScreen();
}

function startGame() {
    startScreenActive = false;
    world = new World(canvas, keyboard);
    drawGame();
}

function drawStartScreen() {
    let ctx = canvas.getContext('2d');
    let bgImage = new Image();
    bgImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    };
}

function drawGame() {
    if (!startScreenActive) {
        world.draw();
    }
}

function showTutorial() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('tutorialMenu').style.display = 'block';
}

function showControls() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'block';
}

function hideSubMenu() {
    document.getElementById('tutorialMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('mainMenu').style.flexDirection = 'row';
}

function toggleBackgroundMusic() {
    if (isBackgroundMusicOn()) {
        pauseBackgroundMusic();
    } else {
        playBackgroundMusic();
    }
}

function playBackgroundMusic() {
    backgroundSoundOn = true;
    sfx.background_sound.play();
    document.getElementById('soundButton').children[0].src = './img/0_sonstiges/app img_volume-high.svg';
}

function pauseBackgroundMusic() {
    backgroundSoundOn = false;
    sfx.background_sound.pause();
    document.getElementById('soundButton').children[0].src = './img/0_sonstiges/app img_volume-xmark.svg';
}

function isBackgroundMusicOn() {
    return backgroundSoundOn;
}

function refreshGame() {
    location.reload();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
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

