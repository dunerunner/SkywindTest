class Main {

    constructor() {
        this.app = new PIXI.Application(800, 600);
        document.body.appendChild(this.app.view);

        this.wheel = PIXI.Sprite.fromImage('assets/images/wheel.png');
        this.arrow = PIXI.Sprite.fromImage('assets/images/arrow.png');

        this.spinSound = new Audio('assets/sounds/spin.mp3');
        this.winSound = new Audio('assets/sounds/win.mp3');

        this.app.ticker.add(
            (deltaTime) => this.enterFrame()
        );
    }

    /**
     * Main enterFrame loop.
     */
    enterFrame() {
        this.app.renderer.resize(
            Math.min(window.innerWidth, document.documentElement.clientWidth),
            Math.min(window.innerHeight, document.documentElement.clientHeight)
        );
    }
}

new Main();

