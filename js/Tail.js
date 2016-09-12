var North    = require('./North.js');
var East     = require('./East.js');
var South    = require('./South.js');
var West     = require('./West.js');
var TailPart = require('./TailPart.js');

class Tail {
    constructor(color, x, y, z) {
        this.color = color;
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
            this.activeTail = new TailPart(this.color, this.activeTail.getLeftHeading(), delta.position + this.x, this.y, this.z);
        } else {
            this.activeTail = new TailPart(this.color, this.activeTail.getLeftHeading(), this.x, this.y, delta.position + this.z);
        }

        this.tails.push(this.activeTail);
    }

    turnRight() {
        this.activeTail = new TailPart(this.color, this.activeTail.getRightHeading(), this.activeTail.getPositionXDelta() + this.x, this.y, this.z);

        this.tails.push(this.activeTail);
    }

    moveForward() {
        this.activeTail.moveForward();
    }
}

module.exports = Tail;
