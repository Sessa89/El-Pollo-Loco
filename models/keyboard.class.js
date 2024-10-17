class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    constructor() {
        this.bindkeyPressEvents();
        this.bindBtnPressEvents();
    }

    bindKeyDownEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) keyboard.LEFT = true;
            if (e.keyCode == 38) keyboard.UP = true;
            if (e.keyCode == 39) keyboard.RIGHT = true;
            if (e.keyCode == 40) keyboard.DOWN = true;
            if (e.keyCode == 32) keyboard.SPACE = true;
            if (e.keyCode == 68) keyboard.D = true;
        });
    }

    bindKeyUpEvents() {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 37) keyboard.LEFT = false;
            if (e.keyCode == 38) keyboard.UP = false;
            if (e.keyCode == 39) keyboard.RIGHT = false;
            if (e.keyCode == 40) keyboard.DOWN = false;
            if (e.keyCode == 32) keyboard.SPACE = false;
            if (e.keyCode == 68) keyboard.D = false;
        });
    }

    bindkeyPressEvents() {
        this.bindKeyDownEvents();
        this.bindKeyUpEvents();
    }

    bindBtnPressEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            const btnThrow = document.getElementById('btnThrow');
            const btnRight = document.getElementById('btnRight');
            const btnLeft = document.getElementById('btnLeft');
            const btnJump = document.getElementById('btnJump');

            this.addEventListeners(btnThrow, 'D');
            this.addEventListeners(btnRight, 'RIGHT');
            this.addEventListeners(btnLeft, 'LEFT');
            this.addEventListeners(btnJump, 'UP');
        });
    }

    addEventListeners(button, key) {
        button.addEventListener('mousedown', () => {
            this[key] = true;
        });
        button.addEventListener('mouseup', () => {
            this[key] = false;
        });
        button.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this[key] = true;
        }, { passive: false });
        button.addEventListener('touchend', (event) => {
            event.preventDefault();
            this[key] = false;
        }, { passive: false });
    }
}