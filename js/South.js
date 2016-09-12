var Heading = require('./Heading.js');
var North   = require('./North.js');
var East    = require('./East.js');
var West    = require('./West.js');

class South extends Heading {
    constructor() {
        super('x', 1, -2);
    }

    getFinalDelta(size) {
        return {
            direction: 'x',
            position: size
        };
    }

    getLeftHeading() {
        return new East();
    }

    getRightHeading() {
        return new West();
    }
}

module.exports = South;
