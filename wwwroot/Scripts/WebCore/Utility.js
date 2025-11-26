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
        return aList[RandomIndex(aList)];
    }
    Utility.RandomElement = RandomElement;
    function RandomIndex(aList) {
        return Math.floor(Math.random() * aList.length);
    }
    Utility.RandomIndex = RandomIndex;
    function removeRandomElement(destroyableList) {
        const pickedIndex = Utility.RandomIndex(destroyableList);
        const item = destroyableList.splice(pickedIndex, 1);
        return item[0];
    }
    Utility.removeRandomElement = removeRandomElement;
    function splitIntoTwoArrays(a, separationPredicate) {
        const length = a.length;
        const predicateTrueArray = [];
        const predicateFalseArray = [];
        for (let i = 0; i < length; i++) {
            if (separationPredicate(a[i]))
                predicateTrueArray.push(a[i]);
            else
                predicateFalseArray.push(a[i]);
        }
        return { predicateTrueArray: predicateTrueArray, predicateFalseArray: predicateFalseArray };
    }
    Utility.splitIntoTwoArrays = splitIntoTwoArrays;
    class UniqueID {
        id = 0;
        newID = () => {
            this.id++;
            return this.id;
        };
    }
    Utility.idGenerator = new UniqueID();
    class StringMatcher {
        the_string;
        position;
        constructor(the_string) {
            this.the_string = the_string;
            this.position = 0;
        }
        Match(character) {
            const isMatched = this.the_string[this.position] == character[0];
            this.position = (isMatched) ? this.position + 1 : 0;
            const isEndOfString = this.the_string.length == this.position;
            return isEndOfString;
        }
    }
    Utility.StringMatcher = StringMatcher;
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    Utility.capitalize = capitalize;
})(Utility || (Utility = {}));
