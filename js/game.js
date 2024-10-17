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
let showControlsForMobileModus = false;

function init() {
    canvas = document.getElementById('canvas');
    checkScreenOrientation();
    window.addEventListener('resize', checkScreenOrientation);
    drawStartScreen();
}

function checkScreenOrientation() {
    let rotateScreenMessage = document.getElementById('rotateScreenMessage');

    if (window.innerHeight > window.innerWidth) {
        if (!rotateScreenMessage) {
            showRotateScreenMessage();
        }
    } else {
        hideRotateScreenMessage();
    }
}

function showRotateScreenMessage() {
    let rotateScreenMessage = document.createElement('div');
    rotateScreenMessage.id = 'rotateScreenMessage';

    let img = document.createElement('img');
    img.src = './img/0_sonstiges/app img_screen-rotate.png';

    rotateScreenMessage.appendChild(img);
    document.body.appendChild(rotateScreenMessage);
}

function hideRotateScreenMessage() {
    let rotateScreenMessage = document.getElementById('rotateScreenMessage');
    if (rotateScreenMessage) {
        rotateScreenMessage.remove();
    }
}


function showStartScreen() {
    location.reload();
}

function startGame() {
    startScreenActive = false;
    world = new World(canvas, keyboard);

    document.getElementById('homeButton').classList.remove('d-none');
    document.getElementById('playButton').classList.add('d-none');
    document.getElementById('impressumButton').classList.add('d-none');

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

function toggleMobileControls() {
    showControlsForMobileModus = !showControlsForMobileModus;

    if (showControlsForMobileModus) {
        document.getElementById('btnLeft').classList.remove('d-none');
        document.getElementById('btnRight').classList.remove('d-none');
        document.getElementById('btnJump').classList.remove('d-none');
        document.getElementById('btnThrow').classList.remove('d-none');
        document.getElementById('toggleImage').src = './img/0_sonstiges/app img_toggle-on.svg';
    } else {
        document.getElementById('btnLeft').classList.add('d-none');
        document.getElementById('btnRight').classList.add('d-none');
        document.getElementById('btnJump').classList.add('d-none');
        document.getElementById('btnThrow').classList.add('d-none');
        document.getElementById('toggleImage').src = './img/0_sonstiges/app img_toggle-off.svg';
    }
}

function showImpressum() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('impressumMenu').style.display = 'block';
}

function hideSubMenu() {
    document.getElementById('tutorialMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'none';
    document.getElementById('impressumMenu').style.display = 'none';
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