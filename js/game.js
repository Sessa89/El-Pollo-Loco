let canvas;
let world;
let keyboard = new Keyboard();
const sfx = {
    background_sound: Object.assign(document.createElement('Audio'), {
        src: './audio/music.mp3',
        loop: true,
        volume: 0.05
    })
}
let backgroundSoundOn = false;
let fullscreenOn = false;
let startScreenActive = true;
let showControlsForMobileModus = false;


/**
 * This function initializes the start screen and game after checking the screen orientation.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkScreenOrientation();
    window.addEventListener('resize', checkScreenOrientation);
    drawStartScreen();
}


/**
 * This function checks the screen orientation (potrait or landscape).
 */
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


/**
 * This functions shows the screen message for rotating the mobile device.
 */
function showRotateScreenMessage() {
    let rotateScreenMessage = document.createElement('div');
    rotateScreenMessage.id = 'rotateScreenMessage';

    let img = document.createElement('img');
    img.src = './img/0_sonstiges/app img_screen-rotate.png';

    rotateScreenMessage.appendChild(img);
    document.body.appendChild(rotateScreenMessage);
}


/**
 * This function hides the screen message for rotating the mobile device.
 */
function hideRotateScreenMessage() {
    let rotateScreenMessage = document.getElementById('rotateScreenMessage');
    if (rotateScreenMessage) {
        rotateScreenMessage.remove();
    }
}


/**
 * This function shows/reloads the start screen.
 */
function showStartScreen() {
    location.reload();
}


/**
 * This function starts the game.
 */
function startGame() {
    initLevel();
    startScreenActive = false;
    world = new World(canvas, keyboard);
    world.activate();

    document.getElementById('homeButton').classList.remove('d-none');
    document.getElementById('playButton').classList.add('d-none');
    document.getElementById('restartButton').classList.remove('d-none');
    document.getElementById('impressumButton').classList.add('d-none');

    drawGame();
}


/**
 * This function draws the start screen.
 */
function drawStartScreen() {
    let ctx = canvas.getContext('2d');
    let bgImage = new Image();
    bgImage.src = './img/9_intro_outro_screens/start/startscreen_1.png';

    bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    };
}


/**
 * This function draws the game.
 */
function drawGame() {
    if (!startScreenActive) {
        world.draw();
    }
}


/**
 * This function shows the tutorial screen/submenu.
 */
function showTutorial() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('tutorialMenu').style.display = 'block';
}


/**
 * This function shows the controls screen/submenu.
 */
function showControls() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'block';
}


/**
 * This function toggles the mobile controls (add or remove them to the screen).
 */
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


/**
 * This function shows the impressum screen/submenu.
 */
function showImpressum() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('impressumMenu').style.display = 'block';
}


/**
 * This function hides all submenus.
 */
function hideSubMenu() {
    document.getElementById('tutorialMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'none';
    document.getElementById('impressumMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('mainMenu').style.flexDirection = 'row';
}


/**
 * This function toggles the background music (on or off).
 */
function toggleBackgroundMusic() {
    if (isBackgroundMusicOn()) {
        pauseBackgroundMusic();
    } else {
        playBackgroundMusic();
    }
}


/**
 * This function plays the background music.
 */
function playBackgroundMusic() {
    backgroundSoundOn = true;
    sfx.background_sound.play();
    document.getElementById('soundButton').children[0].src = './img/0_sonstiges/app img_volume-high.svg';
}


/**
 * This function pauses the background music.
 */
function pauseBackgroundMusic() {
    backgroundSoundOn = false;
    sfx.background_sound.pause();
    document.getElementById('soundButton').children[0].src = './img/0_sonstiges/app img_volume-xmark.svg';
}


/**
 * This function checks if the background sound/music is on or off.
 * @returns true or false
 */
function isBackgroundMusicOn() {
    return backgroundSoundOn;
}


/**
 * This function toggles the fullscreen modus.
 */
function toggleFullscreen() {
    if (isFullscreenOn()) {
        exitFullscreen();
    } else {
        fullscreen();
    }
}


/**
 * This function is for the fullscreen modus.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);

    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
}


/**
 * This function is for entering the fullscreen modus.
 */
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
    document.getElementById('fullscreenButton').children[0].src = './img/0_sonstiges/app img_compress.svg';
}


/**
 * This function is for exiting the fullscreen modus.
 */
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
    document.getElementById('fullscreenButton').children[0].src = './img/0_sonstiges/app img_expand.svg';

    canvas.style.width = "720px";
    canvas.style.height = "480px";
}


/**
 * This function checks if the fullscreen modus is on or off.
 * @returns true or false
 */
function isFullscreenOn() {
    return fullscreenOn;
}


/**
 * This function restarts the game.
 */
function restartGame() {
    intervalManager.clearAllIntervals();

    // character = new Character();
    // level = level1;
    // healthBar = new HealthBar();
    // collectableObjectBar = new CollectableObjectBar();
    // throwableObjectBar = new ThrowableObjectBar();
    // endbossHealthBar = new EndbossHealthBar();
    // throwableObjects = [];
    // coin = new Coin();
    // bottle = new Bottle();
    // gameOver = false;
    // win = false;
    // gameOver_sound.currentTime = 0;
    // winning_sound.currentTime = 0;

    // pauseBackgroundMusic();
    // clearCanvas();
    // setWorld();
    // run();

    if (world) {
        world.stopAllSounds();
    }
    clearCanvas();
    startGame();
}

/**
 * Clears the canvas by resetting its dimensions and clearing any drawings.
 */
function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width; // Canvas zurücksetzen
}