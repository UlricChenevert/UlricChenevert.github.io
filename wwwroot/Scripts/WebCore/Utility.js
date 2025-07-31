export var Utility;
(function (Utility) {
    Utility.getBaseHTMLUrl = (htmlPath) => {
        return window.location.origin + `/HTML/` + htmlPath;
    };
    Utility.getBaseImageUrl = (imagePath) => {
        return window.location.origin + `/Images/` + imagePath;
    };
    async function injectHTML(element, url) {
        return new Promise((resolve) => fetch(url)
            .then((response) => { return response.text(); })
            .then((text) => { element.innerHTML = text; })
            .then(() => resolve()));
    }
    Utility.injectHTML = injectHTML;
    function BundleViewAndModel(model) {
        return { ViewUrl: model.ViewUrl, Model: model };
    }
    Utility.BundleViewAndModel = BundleViewAndModel;
    function RandomElement(aList) {
        return aList[Math.floor(Math.random() * aList.length)];
    }
    Utility.RandomElement = RandomElement;
})(Utility || (Utility = {}));
