import { Entity } from "./Entity.js"

export interface IPhysicalComponent {
    x : number
    y : number
    representation : string
}

export interface IBasicNeedsComponent {
    health : number,
    food : number, // 0 - 1
    water : number, // 0 - 1
    sleep : number, // 0 - 1
}  

export interface IBasicEmotionsComponent {
    fear : number, // 0 - 1
}  

export interface IAdvancedEmotionsComponent {
    fear : number, // 0 - 1
    happiness : number, // 0 - 1
    sadness : number, // 0 - 1
    disgust : number, // 0 - 1
    anger : number, // 0 - 1
    surprise : number // 0 - 1
}  

export interface IVectorComponent {
    direction : number,
    magnitude : number
}   

export interface ComponentBundler<T> {
    entityBundle : Map<number, T>

    // register : (entityId : number, entityData : T) => void
    // bundleData : () => Array<T>
}

export interface EntityDirectory {
    Entities : Array<Entity>
}
