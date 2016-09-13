let Heading = require('./Heading.js');

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
        let North = require('./North.js');

        return new North();
    }

    getRightHeading() {
        let South = require('./South.js');

        return new South();
    }
}

module.exports = East;
