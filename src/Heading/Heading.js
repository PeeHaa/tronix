class Heading {
    constructor(direction, delta, extraSize, name) {
        this.direction = direction;
        this.delta     = delta;
        this.extraSize = extraSize;
    }

    getDirection() {
        return this.direction;
    }

    getDelta() {
        return this.delta;
    }

    getExtraSize() {
        return this.extraSize;
    }
}

module.exports = Heading;
