var North = require('./../../Heading/North.js');
var East  = require('./../../Heading/East.js');
var South = require('./../../Heading/South.js');
var West  = require('./../../Heading/West.js');

class Part {
    constructor(color, heading, x, y, z) {
        this.size  = 1;
        this.color = color;

        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
        var material = new THREE.MeshBasicMaterial({ color: this.color });

        this.tail = new THREE.Mesh(geometry, material);

        this.tail.position.set(x, y, z);

        this.direction = 'x';
        this.delta = 1;
        this.extraSize = 2;

        this.heading = heading;
    }

    getPart() {
        return this.tail;
    }

    moveForward() {
        this.size += this.heading.getExtraSize();

        this.tail.scale[this.heading.getDirection()] = this.size;
        this.tail.position[this.heading.getDirection()] += this.heading.getDelta();
    }

    getPositionXDelta() {
        return this.size;
    }

    getDelta() {
        return this.heading.getFinalDelta(this.size);
    }

    getLeftHeading() {
        return this.heading.getLeftHeading();
    }

    getRightHeading() {
        return this.heading.getRightHeading();
    }
}

module.exports = Part;
