const Trail = require('./Trail/Trail.js');

class Player {
    constructor(color) {
        var geometry = new THREE.BoxGeometry(50, 50, 20);
        var material = new THREE.MeshBasicMaterial({ color: color });

        this.bike = new THREE.Mesh(geometry, material);

        this.bike.position.set(-450, 0, 0);

        this.trail = new Trail(color, -450, 0, 0);
    }

    getBike() {
        return this.bike;
    }

    getTails() {
        return this.trail.getTails();
    }

    getActiveTailPart() {
        return this.trail.getActiveTailPart();
    }

    getActiveTailPartOutline() {
        return this.trail.getActiveTailPartOutline();
    }

    turnLeft() {
        this.bike.rotation.y += Math.PI / 2;

        this.trail.turnLeft();
    }

    turnRight() {
        this.bike.rotation.y -= Math.PI / 2;

        this.trail.turnRight();
    }

    moveForward() {
        this.bike.translateX(2);

        this.trail.moveForward();
    }
}

module.exports = Player;
