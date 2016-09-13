var Heading = require('./Heading.js');
var North   = require('./North.js');
var South   = require('./South.js');

class East extends Heading {
    constructor() {
        super('z', 1, 1);
    }

    getFinalDelta(size) {
        return {
            direction: 'z',
            position: -size
        };
    }

    getLeftHeading() {
        return new North();
    }

    getRightHeading() {
        return new South();
    }
}

module.exports = East;
