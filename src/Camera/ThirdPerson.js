const Camera = require('./Camera.js');

class ThirdPerson extends Camera {
    constructor(scenePosition) {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

        camera.eulerOrder = "YXZ";

        camera.position.set(-300, 150, -100);

        camera.lookAt(scenePosition);

        camera.rotation.x = -.4;
        camera.rotation.y = 4.4;
        camera.rotation.z = 0;

        super(camera);
    }
}

module.exports = ThirdPerson;
