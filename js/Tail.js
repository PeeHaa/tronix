var Tail = require('./TailPart.js');

class Tail {
    constructor(color) {
        this.color = color;
        this.activeTail = new TailPart(this.color);

        this.tails = [this.activeTail];
    }

    getTails() {
        return this.tails;
    }

    getActiveTailPart() {
        this.activeTail;
    }

    turnLeft() {
        this.activeTail = new TailPart(this.color, Math.PI / 2);

        this.tails.push(this.activeTail);
    }

    turnRight() {
        this.activeTail = new TailPart(this.color, -Math.PI / 2);

        this.tails.push(this.activeTail);
    }

    moveForward() {
        this.activeTail.moveForward();
    }
}

module.exports = Tail;
