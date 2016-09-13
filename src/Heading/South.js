const Heading = require('./Heading.js');

class South extends Heading {
    constructor() {
        super('x', -1, 2);
    }

    getFinalDelta(size) {
        return {
            direction: 'x',
            position: -size
        };
    }

    getLeftHeading() {
        const East = require('./East.js');

        return new East();
    }

    getRightHeading() {
        const West = require('./West.js');

        return new West();
    }
}

module.exports = South;
