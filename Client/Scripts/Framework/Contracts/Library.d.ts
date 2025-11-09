interface IRandom {
    random : () => number
}

type constructorType = Function
type dependencyTypes = Function | Object

interface IClassRecipe {
    tag : string,
    classReference : constructorType,
    isSingleInstance : boolean,
    dependencies : dependencyTypes[]
}

interface IAttachDependency {
    build : Function
}

interface IInjector {
    resolve  : (classSymbol : constructorType) => Object,
    register : (classSymbol : constructorType, dependencies : constructorType[], isSingleInstance : boolean) => void
}

interface IPerlin {
    getNoise (x : number, y : number) : number
}




