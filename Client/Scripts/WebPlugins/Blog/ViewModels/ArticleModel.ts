import { ko } from "../../../Framework/Knockout/ko.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { BlogModel } from "./BlogModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Tags } from "../Configuration/Tags.js";

export class ArticleModel implements IHTMLInjectable<void> {
    isLoading: Observable<boolean>;
    public readonly ViewUrl : string = "/WebPlugins/ArticleView.html"

    Blog: IPartialViewModel<BlogModel>
    
    constructor(public readonly BlogUrl : string, 
        public Title : string, public pictureURL : string, public sections : string[], 
        public BlogTags : Tags[], public Date : string, public Author : string, public ReadingTime = "<5 min") {
        this.isLoading = ko.observable(true);

        this.Blog = Utility.BundleViewAndModel(new BlogModel(BlogUrl))
    }

    Init () : Promise<void> {
        return Promise.resolve();
    }
}