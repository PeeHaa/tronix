class Main {
    constructor() {
        this.scene    = new THREE.Scene();

        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(0,150,400);
        this.camera.lookAt(this.scene.position);

        //this.camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        //this.camera.position.z = 5;

        this.addFloor();

        this.players = [];
    }

    run() {
        this.render();

        document.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowLeft') {
                this.players[0].turnLeft();


                var selectedObject = this.scene.getObjectByName(this.players[0].getTail().name);
                this.scene.remove(selectedObject);
            }

            if (e.code === 'ArrowRight') {
                this.players[0].turnRight();

                var selectedObject = this.scene.getObjectByName(this.players[0].getTail().name);
                this.scene.remove(selectedObject);
            }
        }.bind(this));
    }

    render() {
        requestAnimationFrame(this.render.bind(this));

        this.players[0].moveForward();
        this.scene.add(this.players[0].getTail());

        this.renderer.render(this.scene, this.camera);
    }

    addFloor() {
        var floorTexture   = new THREE.TextureLoader().load('/images/floor.jpg');
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;

        floorTexture.repeat.set(10, 10);

        var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

        var floor = new THREE.Mesh(floorGeometry, floorMaterial);

        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;

        this.scene.add(floor);
    }

    addPlayer(player) {
        this.players.push(player);

        this.scene.add(player.getBike());
        console.log(this.scene.add(player.getTail()));
    }
}

module.exports = Main;
