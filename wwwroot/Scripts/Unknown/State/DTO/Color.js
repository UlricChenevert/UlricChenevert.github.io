export class Color {
    red;
    green;
    blue;
    opacity;
    constructor(red, green, blue, opacity = 1.0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
    }
}
