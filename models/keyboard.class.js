class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /*
    THROW_REQUEST_STOP = new Date().getTime();
    THROW_REQUEST_START = 0;

    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        // NOCH NICHT RICHTIG
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.THROW_REQUEST_STOP > this.THROW_REQUEST_START) {
                if ((new Date().getTime() - this.THROW_REQUEST_START)) {
                    this.THROW_REQUEST_START = 0;
                }
                this.D = true;
            }
        });

        // NOCH NICHT RICHTIG
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW_REQUEST_STOP = new Date.getTime();
            this.D = false;
        });
    }

    bindKeyPressEvents() {
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
    }
    */
}