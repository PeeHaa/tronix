const North    = require('./../../Heading/North.js');
const TailPart = require('./Part.js');

class Trail {
    constructor(color, x, y, z) {
        this.color = color - 100;
        this.x     = x;
        this.y     = y;
        this.z     = z;

        this.activeTrail = new TailPart(this.color, new North(), x, y, z);

        this.trails = [this.activeTrail];
    }

    getTails() {
        return this.trails;
    }

    getActiveTailPart() {
        return this.activeTrail.getPart();
    }

    getActiveTailPartOutline() {
        return this.activeTrail.getOutline();
    }

    turn(heading) {
        const delta = this.activeTrail.getDelta();

        if (delta.direction === 'x') {
            this.x += delta.position;
        } else {
            this.z += delta.position;
        }

        this.activeTrail = new TailPart(this.color, heading, this.x, this.y, this.z);

        this.trails.push(this.activeTrail);
    }

    turnLeft() {
        this.turn(this.activeTrail.getLeftHeading());
    }

    turnRight() {
        this.turn(this.activeTrail.getRightHeading());
    }

    moveForward() {
        this.activeTrail.moveForward();
    }
}

module.exports = Trail;
