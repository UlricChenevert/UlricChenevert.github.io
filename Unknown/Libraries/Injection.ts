import { constructorType, dependencyTypes, IClassRecipe, IInjector } from "./interfaces"

export class ClassRecipe implements IClassRecipe {
    tag : string
    classReference : constructorType
    isSingleInstance : boolean
    dependencies : dependencyTypes[]

    constructor (classSymbol : constructorType, dependencies : dependencyTypes[], isSingleInstance = true) {
        this.tag = classSymbol.name
        this.classReference = classSymbol
        this.dependencies = dependencies
        this.isSingleInstance = isSingleInstance
    }
}

class Injector implements IInjector {
    instancesContainer : Map<constructorType, Object>
    recipesContainer : Map<constructorType, IClassRecipe>
    
    constructor () {
        this.instancesContainer = new Map<constructorType, Object> ()
        this.recipesContainer = new Map<constructorType, IClassRecipe> ()
    }

    // Pre-condition: Does not check if dependencies are in right order, but that is acceptable because object
    //                call would fail anyway
    // Adds a object recipe to injector
    register (classSymbol : constructorType, dependencies : dependencyTypes[], isSingleInstance : boolean) {
        if (this.recipesContainer.has(classSymbol))
            throw `${classSymbol} already is in injector!`

        // Adds class to recipe map
        const tempClassRecipe = new ClassRecipe(classSymbol, dependencies, isSingleInstance)
        this.recipesContainer.set(classSymbol, tempClassRecipe)
        
        // Checks for circular dependencies
        this.checkCyclicalDependencies(classSymbol, tempClassRecipe)

        return
    }

    // Returns an object based on it's "type"
    resolve(classSymbol : constructorType) : Object {
        let classRecipe = this.recipesContainer.get(classSymbol)
        if (classRecipe === undefined) throw `Object not found for ${classSymbol.name}!`

        if (classRecipe.isSingleInstance) {
            let tempObject = this.instancesContainer.get(classSymbol)
            
            // This is not created in resolve because I don't want to 
            // force the user to create single instance classes in order
            if (tempObject === undefined) {
                tempObject = <Object>this.build(classRecipe)
                this.instancesContainer.set(classSymbol, tempObject)
            }
            
            return tempObject

        // If the class can be created multiple times, then build dependencies and resolve
        } else {
            return this.build(classRecipe)
        }
    }

    build(classRecipe : IClassRecipe) {
        const classDependencies : Object[] = []

        classRecipe.dependencies.forEach((dependency)=>{
            const resolvedDependency : object = (typeof dependency == "function")? 
                this.resolve(<constructorType> dependency) : dependency // Recursive step
            
            classDependencies.push(resolvedDependency)
        })
        
        // If there is a type error, I want it to fail here
        return new (classRecipe.classReference as any)(...classDependencies) 
    }

    checkCyclicalDependencies(target: constructorType, tree : IClassRecipe) {
        // Gets children
        const children = tree.dependencies

        // Checks children
        children?.forEach((dependency)=>{
            if (typeof dependency != "function") return

            if (dependency == target) {
                throw `${target} has cyclical dependencies`
            }

            // Check children for current target
            this.checkCyclicalDependencies(tree.classReference, <IClassRecipe>this.recipesContainer.get(<constructorType>dependency))
            
            // Iterate through tree with child as target
            this.checkCyclicalDependencies(<constructorType>dependency, <IClassRecipe>this.recipesContainer.get(<constructorType>dependency))
        })
    }
}

export const DependencyInjection = new Injector()