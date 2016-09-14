class Wall {
    constructor(floorMaterial, x, z, rotationY) {
        this.wall = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), floorMaterial);

        this.wall.position.x = x;
        this.wall.position.y = 500;
        this.wall.position.z = z;
        this.wall.rotation.y = rotationY;
    }

    getMesh() {
        return this.wall;
    }
}

module.exports = Wall;
