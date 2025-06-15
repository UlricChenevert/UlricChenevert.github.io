// Based on Linear Congruential Generator
export class RandomGenerator {
    lastNumber;
    multiplier;
    modulus;
    increment;
    constructor(seed, multiplier = 219, modulus = 32749, increment = 30805) {
        this.lastNumber = seed;
        this.multiplier = multiplier;
        this.modulus = modulus;
        this.increment = increment;
    }
    random() {
        this.lastNumber = (this.multiplier * this.lastNumber + this.increment) % this.modulus;
        return this.lastNumber / this.modulus;
    }
}
