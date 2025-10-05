import { ko } from "../../../Framework/Knockout/ko.js";
export class BlogModel {
    ViewUrl;
    isLoading;
    constructor(ViewUrl) {
        this.ViewUrl = ViewUrl;
        this.isLoading = ko.observable(true);
    }
    Init() {
        return Promise.resolve();
    }
}
