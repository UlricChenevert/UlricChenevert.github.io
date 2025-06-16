export class Coordinate {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    name() {
        return `${this.x}-${this.y}`;
    }
}
