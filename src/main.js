let SquaresFloor = require('./Floor/Squares.js');
let SideCamera   = require('./Camera/Side.js');

class Main {
    constructor() {
        this.scene = new THREE.Scene();

        this.scene.add(new SquaresFloor().getMesh());

        this.camera = new SideCamera(this.scene.position).getCamera();

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
