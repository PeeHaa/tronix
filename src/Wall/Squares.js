const Wall = require('./Wall.js');

class Squares extends Wall {
    constructor(x, z, rotationY) {
        const texture = new THREE.TextureLoader().load('/images/wall.jpg');

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(10, 10);

        super(new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        }), x, z, rotationY);
    }
}

module.exports = Squares;
