const Camera = require('./Camera.js');

class ThirdPerson extends Camera {
    constructor(scenePosition) {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

        super(camera);

        this.camera = camera;

        this.camera.eulerOrder = "YXZ";

        this.camera.position.set(-300, 150, -100);

        this.camera.lookAt(scenePosition);

        this.lookForward();
    }

    lookBack() {
        this.camera.rotation.y = 7.6;
    }

    lookForward() {
        this.camera.rotation.x = -0.4;
        this.camera.rotation.y = 4.4;
        this.camera.rotation.z = 0;
    }
}

module.exports = ThirdPerson;
