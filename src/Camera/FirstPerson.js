const Camera = require('./Camera.js');

class FirstPerson extends Camera {
    constructor(scenePosition) {
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000);

        camera.eulerOrder = "YXZ";

        camera.position.set(1, 0, 0);

        camera.lookAt(scenePosition);

        camera.rotation.x = 0;
        camera.rotation.y = 4.8; // 5
        camera.rotation.z = 0;

        super(camera);
    }
}

module.exports = FirstPerson;
