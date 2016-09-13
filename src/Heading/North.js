const Heading = require('./Heading.js');

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
        const West  = require('./West.js');

        return new West();
    }

    getRightHeading() {
        const East = require('./East.js');

        return new East();
    }
}

module.exports = North;
