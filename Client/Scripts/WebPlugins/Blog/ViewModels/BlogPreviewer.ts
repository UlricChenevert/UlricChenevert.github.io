import { ko } from "../../../Framework/Knockout/ko.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { PageOption } from "../../../WebCore/Contracts/PageOption.js";
import { customEvents } from "../Configuration/Events.js";
export class BlogPreviewer implements IHTMLInjectable<void> {
    isLoading: Observable<boolean>;
    public readonly ViewUrl : string = "/WebPlugins/BlogPreviewer.html"
    
    constructor(public options: PageOption[]) {
        this.isLoading = ko.observable(true);
    }

    Init () : Promise<void> {
        return Promise.resolve();
    }

    async UpdatePage (selectedOption? : PageOption) {
        if (selectedOption === undefined) return;

        document.dispatchEvent(new CustomEvent("pageChange" as customEvents, {
        detail: selectedOption,
        bubbles: true // Allows the event to propagate up the DOM tree
    }));
    }
}