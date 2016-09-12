class Heading {
    constructor(direction, delta, extraSize, name) {
        this.direction = direction;
        this.delta     = delta;
        this.extraSize = extraSize;

        this.name = name;
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
