class Tail {
    constructor(color) {
        this.size  = 1;
        this.color = color;

        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
        var material = new THREE.MeshBasicMaterial({ color: this.color });

        this.tail = new THREE.Mesh(geometry, material);

        this.tail.name = 'tail';
    }

    getTail() {
        return this.tail;
    }

    turnLeft() {
        this.tail.rotation.y += Math.PI / 2;
    }

    turnRight() {
        this.tail.rotation.y -= Math.PI / 2;
    }

    moveForward() {
        this.size += 2;

        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
        var material = new THREE.MeshBasicMaterial({ color: this.color });

        this.tail = new THREE.Mesh(geometry, material);

        this.tail.name = 'tail';
    }
}

module.exports = Tail;
