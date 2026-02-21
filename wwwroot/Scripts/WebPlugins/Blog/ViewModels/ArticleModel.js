import { ko } from "../../../Framework/Knockout/ko.js";
import { BlogModel } from "./BlogModel.js";
import { Utility } from "../../../WebCore/Utility.js";
export class ArticleModel {
    BlogUrl;
    isLoading;
    ViewUrl = "/PartialViews/ArticleView.html";
    Blog;
    constructor(BlogUrl) {
        this.BlogUrl = BlogUrl;
        this.isLoading = ko.observable(true);
        this.Blog = Utility.BundleViewAndModel(new BlogModel(BlogUrl));
    }
    Init() {
        return Promise.resolve();
    }
}
