class Wall {
    constructor(floorMaterial, x, z, rotationY) {
        this.wall = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), floorMaterial);
console.log({
    x: x, z: z
});
        this.wall.position.x = x;
        this.wall.position.y = 500;
        this.wall.position.z = z;
        this.wall.rotation.y = rotationY;



        /*
        this.wall.position.x = 500;
        this.wall.position.y = 500;
        this.wall.position.z = 0;
        */

        /*
        this.wall.position.x = -500;
        this.wall.position.y = 500;
        this.wall.position.z = 0;

        this.wall.rotation.y = Math.PI / 2;
        */
    }

    getMesh() {
        return this.wall;
    }
}

module.exports = Wall;
