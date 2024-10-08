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

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world['character']);         // Alternative Schreibweise "world.character"    
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
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
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
    document.getElementById('speaker').src = './img/0_sonstiges/app img_volume-high.svg';
}

function pauseBackgroundMusic() {
    backgroundSoundOn = false;
    sfx.background_sound.pause();
    document.getElementById('speaker').src = './img/0_sonstiges/app img_volume-xmark.svg';
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
}