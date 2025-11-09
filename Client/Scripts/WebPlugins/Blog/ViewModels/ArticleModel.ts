import { ko } from "../../../Framework/Knockout/ko.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { BlogModel } from "./BlogModel.js";
import { Utility } from "../../../WebCore/Utility.js";

export class ArticleModel implements IHTMLInjectable<void> {
    isLoading: Observable<boolean>;
    public readonly ViewUrl : string = "/PartialViews/ArticleView.html"

    Blog: IPartialViewModel<BlogModel>
    
    constructor(public readonly BlogUrl : string) {
        this.isLoading = ko.observable(true);

        this.Blog = Utility.BundleViewAndModel(new BlogModel(BlogUrl))
    }

    Init () : Promise<void> {
        return Promise.resolve();
    }
}