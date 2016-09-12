var Tail  = require('./Tail.js');

class Player {
    constructor(color) {
        var geometry = new THREE.BoxGeometry(50, 50, 20);
        var material = new THREE.MeshBasicMaterial({ color: color });

        this.bike = new THREE.Mesh(geometry, material);

        this.tail = new Tail(color);
    }

    getBike() {
        return this.bike;
    }

    getTails() {
        return this.tail.getTails();
    }

    getActiveTailPart() {
        return this.tail.getActiveTailPart();
    }

    turnLeft() {
        this.bike.rotation.y += Math.PI / 2;

        this.tail.turnLeft();
    }

    turnRight() {
        this.bike.rotation.y -= Math.PI / 2;

        this.tail.turnRight();
    }

    moveForward() {
        this.bike.translateX(2);

        this.tail.moveForward();
    }
}

module.exports = Player;
