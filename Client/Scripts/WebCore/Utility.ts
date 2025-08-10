import { IHTMLInjectable, IPartialViewModel } from "../Framework/IPartialViewModel.js"

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

    export function BundleViewAndModel<T> (model : IHTMLInjectable & T) : IPartialViewModel<T> {
        return {ViewUrl: model.ViewUrl, Model : model}
    }
    
    export function RandomElement<T> (aList : T[]) {
        return aList[Math.floor(Math.random()*aList.length)]
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
}