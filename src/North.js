var Heading = require('./Heading.js');
var East    = require('./East.js');
var South   = require('./South.js');
var West    = require('./West.js');

class North extends Heading {
    constructor() {
        super('x', 1, 2);
    }

    getFinalDelta(size) {
        return {
            direction: 'x',
            position: size
        };
    }

    getLeftHeading() {
        return new West();
    }

    getRightHeading() {
        return new East();
    }
}

module.exports = North;
