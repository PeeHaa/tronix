const North = require('./../../Heading/North.js');
const East  = require('./../../Heading/East.js');
const South = require('./../../Heading/South.js');
const West  = require('./../../Heading/West.js');

class Part {
    constructor(color, heading, x, y, z) {
        this.size  = 1;
        this.color = color;

        const geometry = new THREE.BoxGeometry(this.size, 20, 2);
        const material = new THREE.MeshBasicMaterial({ color: this.color });

        this.tail = new THREE.Mesh(geometry, material);

        this.outline = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }));

        this.tail.position.set(x, 10, z);
        this.outline.position.set(x, 10, z);

        this.direction = 'x';
        this.delta = 1;
        this.extraSize = 2;

        this.heading = heading;
    }

    getPart() {
        return this.tail;
    }

    getOutline() {
        return this.outline;
    }

    moveForward() {
        this.size += this.heading.getExtraSize();

        this.tail.scale[this.heading.getDirection()] = this.size;
        this.outline.scale[this.heading.getDirection()] = this.size;

        this.tail.position[this.heading.getDirection()] += this.heading.getDelta();
        this.outline.position[this.heading.getDirection()] += this.heading.getDelta();
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
