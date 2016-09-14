const Camera = require('./Camera.js');

class Side extends Camera {
    constructor(scenePosition) {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

        camera.position.set(0, 150, 400);

        camera.lookAt(scenePosition);

        super(camera);
    }

    lookBack() {

    }

    lookForward() {

    }
}

module.exports = Side;
