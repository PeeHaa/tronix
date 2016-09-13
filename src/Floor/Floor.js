class Floor {
    constructor(floorMaterial) {
        this.floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), floorMaterial);

        this.floor.position.y = -0.5;
        this.floor.rotation.x = Math.PI / 2;
    }

    getMesh() {
        return this.floor;
    }
}

module.exports = Floor;
