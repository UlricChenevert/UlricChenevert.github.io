export class Perlin {

    GradientVectorGrid : Array<Array<Vector>>
    octaves : number
    gradientGridWidth : number

    private readonly rangeY : number
    private readonly rangeX : number

    private readonly minimumY : number
    private readonly minimumX : number

    constructor (maximumX : number, maximumY : number, minimumX = 0, minimumY = 0, gradientGridWidth = 32, octaves = 4) {
        this.gradientGridWidth = gradientGridWidth
        this.octaves = octaves
        this.GradientVectorGrid = []

        this.rangeX = maximumX - minimumX
        this.rangeY = maximumY - minimumY

        this.minimumX = minimumX
        this.minimumY = minimumY

        // Generate gradient grid
        for (let i = 0; i < gradientGridWidth; i++) {  
            const vectorArray = []
            for (let j = 0; j < gradientGridWidth; j++) {  

                // Range from -1, 1
                vectorArray.push(new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1))
            }

            this.GradientVectorGrid.push(vectorArray)
        }

    }


    getNoise (x : number, y : number) : number {
        // normalize 0 to 1 
        const normalizedX = (x - this.minimumX) / this.rangeX 
        const normalizedY = (y - this.minimumY) / this.rangeY

        // Normalize 0 to gradientGridWidth
        const gridX = normalizedX * this.gradientGridWidth
        const gridY = normalizedY * this.gradientGridWidth

        return this.generateNoise(gridX, gridY) //this.generateNoise(x / (this.gradientGridWidth), y / (this.gradientGridWidth))
    }

    private FractalBrownianMotion (x : number, y : number, imageSize : {width: number, height : number}) : number {
        let result = 0.0
        let amplitude = 1.0
        let frequency = 0.25
        const frequencyMax = 4

        // Convert pixel coordinates to gradient grid space
        const gridX = x * (this.gradientGridWidth - 1) / imageSize.width
        const gridY = y * (this.gradientGridWidth - 1) / imageSize.height 

        while (frequency < frequencyMax) {
            const octaveNoise = amplitude * this.generateNoise(frequency * gridX, frequency * gridY)

            result += octaveNoise

            amplitude = amplitude * .30
            frequency = frequency * 2
        }
        
        return result
    }

    private generateNoise (x : number, y : number) : number {
        
        const LeftX = Math.floor(x) % (this.gradientGridWidth - 1)
        const RightX = (LeftX + 1)  % (this.gradientGridWidth - 1)
        const TopY = Math.floor(y) % (this.gradientGridWidth - 1)
        const BottomY = (TopY + 1)  % (this.gradientGridWidth - 1)

        const relativePosition = new Coordinate(x - Math.floor(x), y - Math.floor(y)) 
        //const relativeVector = new Vector(relativePosition.x, relativePosition.y)
    
        // Distances
        const TopLeftInfluence = this.dotProduct(new Vector(relativePosition.x, relativePosition.y), this.GradientVectorGrid[LeftX][TopY])
        const TopRightInfluence = this.dotProduct(new Vector(relativePosition.x - 1, relativePosition.y), this.GradientVectorGrid[RightX][TopY])
        const BottomLeftInfluence = this.dotProduct(new Vector(relativePosition.x, relativePosition.y - 1), this.GradientVectorGrid[LeftX][BottomY])
        const BottomRightInfluence = this.dotProduct(new Vector(relativePosition.x - 1, relativePosition.y - 1), this.GradientVectorGrid[RightX][BottomY])

        const SmoothedPosition = new Coordinate(this.smoothStep(relativePosition.x), this.smoothStep(relativePosition.y))

        const bottomInterpolation = this.interpolate(TopLeftInfluence, TopRightInfluence, SmoothedPosition.x)
        const topInterpolation = this.interpolate(BottomLeftInfluence, BottomRightInfluence, SmoothedPosition.x)
        const finalNoise = this.interpolate(bottomInterpolation, topInterpolation, SmoothedPosition.y)

        return (finalNoise + 1) / 2 // Final Interpolation
    }

    
    private dotProduct (VectorA : Vector, VectorB : Vector) {
        return VectorA.xMagnitude * VectorB.xMagnitude + VectorA.yMagnitude * VectorB.yMagnitude
    }

    private interpolate(startValue : number, endValue : number, weight : number) {
        return startValue + weight * (endValue - startValue);
    }

    private smoothStep(x : number) {
        return 6*x**5-15*x**4+10*x**3
    }
}

class Vector {
    xMagnitude : number
    yMagnitude : number
    
    // xMagnitude*i + yMagnitude * j
    constructor(xMagnitude : number, yMagnitude : number) { 
        this.xMagnitude = xMagnitude
        this.yMagnitude = yMagnitude
    }
}

class Coordinate {
    x : number
    y : number
    constructor (x : number, y : number) {
        this.y = y
        this.x = x
    }
}