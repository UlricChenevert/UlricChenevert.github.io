// Based on Linear Congruential Generator

export class RandomGenerator implements IRandom {
    lastNumber : number
    multiplier : number
    modulus : number
    increment : number

    constructor (seed : number, multiplier = 219, modulus = 32749, increment = 30805) {
        this.lastNumber = seed
        this.multiplier = multiplier
        this.modulus = modulus
        this.increment = increment

    }
    random() : number {
        this.lastNumber = (this.multiplier * this.lastNumber + this.increment) % this.modulus
        return this.lastNumber / this.modulus
    }

}