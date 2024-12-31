export class Color {
    red : number
    green : number
    blue : number
    opacity : number
    constructor (red : number, green : number, blue : number, opacity : number = 1.0) {
        this.red = red
        this.green = green
        this.blue = blue
        this.opacity = opacity
    }
}