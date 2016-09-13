let Floor = require('./Floor.js');

class Squares extends Floor {
    constructor() {
        let floorTexture = new THREE.TextureLoader().load('/images/floor.jpg');

        floorTexture.wrapS = THREE.RepeatWrapping;
        floorTexture.wrapT = THREE.RepeatWrapping;

        floorTexture.repeat.set(10, 10);

        super(new THREE.MeshBasicMaterial({
            map: floorTexture,
            side: THREE.DoubleSide
        }));
    }
}

module.exports = Squares;
