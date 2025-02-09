export interface IRandom {
    random : () => number
}

export type constructorType = Function
export type dependencyTypes = Function | Object

export interface IClassRecipe {
    tag : string,
    classReference : constructorType,
    isSingleInstance : boolean,
    dependencies : dependencyTypes[]
}

export interface IAttachDependency {
    build : Function
}

export interface IInjector {
    resolve  : (classSymbol : constructorType) => Object,
    register : (classSymbol : constructorType, dependencies : constructorType[], isSingleInstance : boolean) => void
}

export interface IPerlin {
    getNoise (x : number, y : number) : number
}




