const SquaresFloor = require('./Floor/Squares.js');
const SquaresWall  = require('./Wall/Squares.js');
const SideCamera   = require('./Camera/Side.js');
const FirstPersonCamera = require('./Camera/FirstPerson.js');
const ThirdPersonCamera = require('./Camera/ThirdPerson.js');

class Main {
    constructor() {
        this.lastTick   = Date.now();
        this.lastUpdate = new Date().getSeconds();
        this.fps        = 0;

        this.scene = new THREE.Scene();

        this.scene.add(new SquaresFloor().getMesh());
        this.scene.add(new SquaresWall(0, -500, 0).getMesh());
        this.scene.add(new SquaresWall(0, 500, Math.PI).getMesh());
        this.scene.add(new SquaresWall(500, 0, Math.PI * 1.5).getMesh());
        this.scene.add(new SquaresWall(-500, 0, Math.PI / 2).getMesh());

        this.cameras = [
            new ThirdPersonCamera(this.scene.position),
            new SideCamera(this.scene.position),
            new FirstPersonCamera(this.scene.position)
        ];

        this.activeCamera = 0;

        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.players = [];
    }

    run() {
        this.render();

        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.players[0].turnLeft();
            }

            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.players[0].turnRight();
            }

            if (e.code === 'ArrowDown') {
                this.cameras[this.activeCamera].lookBack();
            }

            if (e.code === 'KeyC') {
                if (this.activeCamera === this.cameras.length - 1) {
                    this.activeCamera = 0;
                } else {
                    this.activeCamera++;
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowDown') {
                this.cameras[this.activeCamera].lookForward();
            }
        });
    }

    render() {
        requestAnimationFrame(this.render.bind(this));

        this.players[0].moveForward();
        this.scene.remove(this.players[0].getActiveTailPart());
        this.scene.remove(this.players[0].getActiveTailPartOutline());
        this.scene.add(this.players[0].getActiveTailPart());
        this.scene.add(this.players[0].getActiveTailPartOutline());

        this.renderer.render(this.scene, this.cameras[this.activeCamera].getCamera());

        if (this.lastUpdate !== new Date().getSeconds()) {
            const delta = (Date.now() - this.lastTick) / 1000;

            document.querySelector('[data-huditem="fps"]').textContent = Math.round(1 / delta);
        }

        this.lastTick   = Date.now();
        this.lastUpdate = new Date().getSeconds();
    }

    addPlayer(player) {
        this.players.push(player);

        this.scene.add(player.getBike());
        this.scene.add(player.getActiveTailPart());

        for (let i = 0; i < this.cameras.length; i++) {
            player.getBike().add(this.cameras[i].getCamera());
        }
    }
}

module.exports = Main;
