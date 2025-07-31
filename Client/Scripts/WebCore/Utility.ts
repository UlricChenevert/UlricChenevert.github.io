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
}