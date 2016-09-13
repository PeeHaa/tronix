var North    = require('./../../Heading/North.js');
var East     = require('./../../Heading/East.js');
var South    = require('./../../Heading/South.js');
var West     = require('./../../Heading/West.js');
var TailPart = require('./Part.js');

class Trail {
    constructor(color, x, y, z) {
        this.color = color - 100;
        this.x     = x;
        this.y     = y;
        this.z     = z;

        this.activeTail = new TailPart(this.color, new North(), x, y, z);

        this.tails = [this.activeTail];
    }

    getTails() {
        return this.tails;
    }

    getActiveTailPart() {
        return this.activeTail.getPart();
    }

    turnLeft() {
        var delta = this.activeTail.getDelta();

        if (delta.direction === 'x') {
            this.x += delta.position;
        } else {
            this.z += delta.position;
        }

        this.activeTail = new TailPart(this.color, this.activeTail.getLeftHeading(), this.x, this.y, this.z);

        this.tails.push(this.activeTail);
    }

    turnRight() {
        var delta = this.activeTail.getDelta();

        if (delta.direction === 'x') {
            this.x += delta.position;
        } else {
            this.z += delta.position;
        }

        this.activeTail = new TailPart(this.color, this.activeTail.getRightHeading(), this.x, this.y, this.z);

        this.tails.push(this.activeTail);
    }

    moveForward() {
        this.activeTail.moveForward();
    }
}

module.exports = Trail;
