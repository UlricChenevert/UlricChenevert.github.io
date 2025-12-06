
export namespace Utility {
    export const getBaseHTMLUrl = (htmlPath : string) => {
        return window.location.origin + `/HTML/` + htmlPath
    }

    export const getBaseImageUrl = (imagePath : string) => {
        return window.location.origin + `/Images/` + imagePath
    }

    export async function injectHTML(element : HTMLElement, url : string) : Promise<void> {
        return new Promise<void>(
            (resolve)=>
                fetch(url)
                    .then((response)=>{return response.text()})
                    .then((text)=>{element.innerHTML = text})
                    .then(()=>resolve())
            )
    }

    export function BundleViewAndModel<ResolveType, ModelType, InitializationType = undefined> (model : IHTMLInjectable<ResolveType, InitializationType> & ModelType) : IPartialViewModel<ModelType> {
        return {ViewUrl: model.ViewUrl, Model : model}
    }
    
    export function RandomElement<T> (aList : T[]) {
        return aList[RandomIndex(aList)]
    }

    export function RandomIndex<T> (aList : T[]) {
        return Math.floor(Math.random()*aList.length)
    }

    export function removeRandomElement<T>(destroyableList : T[]) : T {
        const pickedIndex = Utility.RandomIndex(destroyableList)
        const item = destroyableList.splice(pickedIndex, 1)

        return item[0]

    }

    export function splitIntoTwoArrays<T> (a : T[], separationPredicate : (element : T)=>boolean) {
        const length = a.length

        const predicateTrueArray = []
        const predicateFalseArray = []
        
        for (let i = 0; i < length; i++) {
            if (separationPredicate(a[i]))
                predicateTrueArray.push(a[i])
            else
                predicateFalseArray.push(a[i])
        }   

        return {predicateTrueArray: predicateTrueArray, predicateFalseArray: predicateFalseArray}
    }

    class UniqueID {
        id = 0
        newID = () => {
            this.id ++
            return this.id
        }
    }

    export const idGenerator = new UniqueID()

    export class StringMatcher {
        position : number

        constructor (public the_string : string) {
            this.position = 0
        }

        Match (character : string) : boolean {
            const isMatched = this.the_string[this.position] == character[0]

            this.position = (isMatched)? this.position + 1 : 0

            const isEndOfString = this.the_string.length == this.position

            return isEndOfString 
        }
    }

    export function capitalize (str : string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    export function shuffle<T> (array : T[]) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array
    }
}