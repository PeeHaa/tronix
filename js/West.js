var Heading = require('./Heading.js');
var North   = require('./North.js');
var South   = require('./South.js');
var East    = require('./East.js');

class West extends Heading {
    constructor() {
        super('z', -1, 1);
    }

    getFinalDelta(size) {
        return {
            direction: 'z',
            position: -size
        };
    }

    getLeftHeading() {
        return new South();
    }

    getRightHeading() {
        return new North();
    }
}

module.exports = West;
