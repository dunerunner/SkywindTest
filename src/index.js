class Main {

    constructor() {
        this.app = new PIXI.Application(800, 600);
        document.body.appendChild(this.app.view);
        document.body.style.cursor = 'pointer';

        window.onclick = this.onWindowClick.bind(this);

        this.constants = {
            WHEEL_WIDTH: 600,
            ROTATION_DISCREPANCY: 2,
            RAD_TO_DEG_RATIO: 57.2958,
            NUMBER_OF_SECTORS: 16,
            MINIMUM_ROTATION_RAD: 12
        };

        this.valuesMap = [
            {
                degrees: 0,
                value: 4
            },
            {
                degrees: 22,
                value: 2
            },
            {
                degrees: 45,
                value: 6
            },
            {
                degrees: 67,
                value: 3
            },
            {
                degrees: 90,
                value: 7
            },
            {
                degrees: 112,
                value: 5
            },
            {
                degrees: 135,
                value: 3
            },
            {
                degrees: 157,
                value: 5
            },
            {
                degrees: 180,
                value: 2
            },
            {
                degrees: 202,
                value: 15
            },
            {
                degrees: 225,
                value: 3
            },
            {
                degrees: 247,
                value: 2
            },
            {
                degrees: 270,
                value: 5
            },
            {
                degrees: 292,
                value: 7
            },
            {
                degrees: 315,
                value: 3
            },
            {
                degrees: 337,
                value: 2
            }
        ];

        this.wheel = PIXI.Sprite.fromImage('assets/images/wheel.png');
        this.arrow = PIXI.Sprite.fromImage('assets/images/arrow.png');

        this.countingText = new PIXI.Text('WHEEL RESULT', {
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontSize: 500,
            fontFamily: 'Arial',
            fill: '#ff0000',
            align: 'center',
            stroke: '#0000ff',
            strokeThickness: 14
        });

        this.countingText.anchor.set(0.5);

        this.spinSound = new Audio('assets/sounds/spin.mp3');
        this.winSound = new Audio('assets/sounds/win.mp3');

        this.wheel.anchor.set(0.5);
        this.arrow.anchor.set(0.5);

        this.app.stage.addChild(this.wheel);
        this.app.stage.addChild(this.arrow);

        this.rotated = 0;
        this.selectedSector = null;
        this.previouslySelectedSector = null;
        this.resultCounter = 0;

        this.app.ticker.add(
            (deltaTime) => this.enterFrame(deltaTime)
        );
    }

    /**
     * Main enterFrame loop.
     */
    enterFrame(deltaTime) {
        this.app.renderer.resize(
            Math.min(window.innerWidth, document.documentElement.clientWidth),
            Math.min(window.innerHeight, document.documentElement.clientHeight)
        );
        this.wheel.x = this.app.screen.width / 2;
        this.wheel.y = this.app.screen.height / 2;

        this.arrow.x = this.app.screen.width / 2 + this.constants.WHEEL_WIDTH / 2;
        this.arrow.y = this.app.screen.height / 2;

        this.countingText.x = this.app.screen.width / 2;
        this.countingText.y = this.app.screen.height / 2;

        if (this.selectedSector) {
            this.spinSound.play();
            const currentRotation = this.toDegrees(this.wheel.rotation);
            const requiredRotation = this.valuesMap[this.selectedSector].degrees + (this.numberOfSpins * 360);

            this.numberOfSpins = Math.floor(currentRotation / 360);

            if ((Math.abs(currentRotation - requiredRotation) > this.constants.ROTATION_DISCREPANCY) || (this.rotated < this.constants.MINIMUM_ROTATION_RAD)) {
                this.wheel.rotation += 0.1;
                this.rotated += 0.1;
            } else {
                this.spinSound.pause();
                this.winSound.play();
                this.app.stage.addChild(this.countingText);

                if (Math.floor(this.resultCounter) !== this.valuesMap[this.selectedSector].value) {
                    this.countingText.text = Math.floor(this.resultCounter);
                    this.resultCounter += 0.06;
                } else {
                    this.countingText.text = this.valuesMap[this.selectedSector].value;
                    this.rotated = 0;
                    this.selectedSector = null;
                    this.resultCounter = 0;
                    setTimeout(() => this.app.stage.removeChild(this.countingText), 2000);
                }
            }
        }
    }

    selectRandomSector() {
        let randomSector = Math.floor(Math.random() * this.constants.NUMBER_OF_SECTORS);
        while (randomSector === this.previouslySelectedSector) {
            randomSector = Math.floor(Math.random() * this.constants.NUMBER_OF_SECTORS);
        }
        this.previouslySelectedSector = randomSector;
        this.selectedSector = randomSector;
    }

    onWindowClick() {
        this.selectRandomSector();
    }

    toDegrees(rad) {
        return Math.floor(rad * this.constants.RAD_TO_DEG_RATIO);
    }
}

new Main();
