let Heading = require('./Heading.js');

class West extends Heading {
    constructor() {
        console.log('Going West');

        super('z', -1, 1);
    }

    getFinalDelta(size) {
        return {
            direction: 'z',
            position: -size  * 2
        };
    }

    getLeftHeading() {
        let South = require('./South.js');

        return new South();
    }

    getRightHeading() {
        let North = require('./North.js');

        return new North();
    }
}

module.exports = West;
