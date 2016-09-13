let SquaresFloor = require('./Floor/Squares.js');

class Main {
    constructor() {
        this.scene = new THREE.Scene();

        this.scene.add(new SquaresFloor().getMesh());

        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

        this.camera.position.set(0,150,400);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.players = [];
    }

    run() {
        this.render();

        document.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowLeft') {
                this.players[0].turnLeft();
            }

            if (e.code === 'ArrowRight') {
                this.players[0].turnRight();
            }
        }.bind(this));
    }

    render() {
        requestAnimationFrame(this.render.bind(this));

        this.players[0].moveForward();
        this.scene.remove(this.players[0].getActiveTailPart());
        this.scene.add(this.players[0].getActiveTailPart());

        this.renderer.render(this.scene, this.camera);
    }

    addPlayer(player) {
        this.players.push(player);

        this.scene.add(player.getBike());
        this.scene.add(player.getActiveTailPart());

        player.getBike().add(this.camera);
    }
}

module.exports = Main;
