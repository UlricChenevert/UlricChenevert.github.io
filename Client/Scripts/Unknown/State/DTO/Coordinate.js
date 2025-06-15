export class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    name() {
        return `${this.x}-${this.y}`;
    }
}
