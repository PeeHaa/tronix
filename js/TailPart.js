class TailPart {
    constructor(color, rotation) {
        this.size  = 1;
        this.color = color;

        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
        var material = new THREE.MeshBasicMaterial({ color: this.color });

        this.tail = new THREE.Mesh(geometry, material);

        if (typeof rotation !== 'undefined') {
            this.tail.rotation.y += rotation;
        }
    }

    moveForward() {
        this.size += 2;

        this.tail.scale.x = this.size;
        this.tail.position.x += 1;
    }
}

module.exports = TailPart;
