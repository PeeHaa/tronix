var North = require('./North.js');
var East  = require('./East.js');
var South = require('./South.js');
var West  = require('./West.js');

class TailPart {
    //constructor(color, rotation, x, y, z) {
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

/*
        this.heading = new North();

        if (typeof rotation !== 'undefined' && rotation === Math.PI / 2) {
            //this.tail.rotation.y += rotation;

            this.direction = 'z';
            this.delta = -1;
            this.extraSize = 1;

            this.heading = new East();
        }

        if (typeof rotation !== 'undefined' && rotation === -Math.PI / 2) {
            //this.tail.rotation.y += rotation;

            this.direction = 'z';
            this.delta = 1;
            this.extraSize = 1;

            this.heading = new West();
        }
*/
    }

    getPart() {
        return this.tail;
    }

    moveForward() {
        //this.size += this.extraSize;
        this.size += this.heading.getExtraSize();

        //this.tail.scale[this.direction] = this.size;
        //this.tail.position[this.direction] += this.delta;
//console.log(this.heading);
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

module.exports = TailPart;
