let Heading = require('./Heading.js');

class North extends Heading {
    constructor() {
        console.log('Going North');

        super('x', 1, 2);
    }

    getFinalDelta(size) {
        return {
            direction: 'x',
            position: size
        };
    }

    getLeftHeading() {
        let West  = require('./West.js');

        return new West();
    }

    getRightHeading() {
        let East = require('./East.js');

        return new East();
    }
}

module.exports = North;
