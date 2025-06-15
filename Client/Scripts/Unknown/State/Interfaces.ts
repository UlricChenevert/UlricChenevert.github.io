import { Color } from "./DTO/Color.js"
import { Coordinate } from "./DTO/Coordinate.js"
import { Entity } from "./DTO/Entity.js"

export interface ILocationComponent {
    location : Coordinate
}

// export interface IPhysicalComponent {
//     location : Coordinate
//     representation : string
// }

export interface IBasicNeedsComponent {
    health : number,
    food : number, // 0 - 1
    water : number, // 0 - 1
    sleep : number, // 0 - 1
}  

export interface IBasicEmotionsComponent {
    fear : number, // 0 - 1
}  

export interface IColorComponent {
    color : Color
}

export interface IAdvancedEmotionsComponent {
    fear : number, // 0 - 1
    happiness : number, // 0 - 1
    sadness : number, // 0 - 1
    disgust : number, // 0 - 1
    anger : number, // 0 - 1
    surprise : number // 0 - 1
}  

export interface IDisplayableComponent extends IColorComponent, IDepictionComponent, ILocationComponent {
    representation : string
    location: Coordinate;
    color: Color;
}

export interface IVectorComponent {
    xMagnitude : number,
    yMagnitude : number
}   

export interface IComponentBundler<T> {
    entityBundle : Map<number, T>
}

export interface IDepictionComponent {
    representation : string
}

export interface IResourceComponent {
    type : string
    amount : number
}

export interface IEntityDirectory {
    Entities : Array<Entity>
}
