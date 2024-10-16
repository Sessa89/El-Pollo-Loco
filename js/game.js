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
let fullscreenOn = false;
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

function toggleFullscreen() {
    if (isFullscreenOn()) {
        exitFullscreen();
    } else {
        fullscreen();
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);

    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // für IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // für iOS Safari
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {     // für Firefox
        element.mozRequestFullScreen();
    }
    fullscreenOn = true;
    document.getElementById('fullscreenButton').children[0].src = './img/0_sonstiges/app img_compress.svg';  // Icon ändern
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    fullscreenOn = false;
    document.getElementById('fullscreenButton').children[0].src = './img/0_sonstiges/app img_expand.svg';  // Icon zurück ändern

    canvas.style.width = "720px";
    canvas.style.height = "480px";
}

function isFullscreenOn() {
    return fullscreenOn;
}