import * as ko from "../Libraries/knockout.js";
import { PageModel } from "./PageModel.js";
const pageElement = document.getElementById("custom-article");
pageElement.addEventListener("DOMContentLoaded", (e) => {
    ko.applyBindings(PageModel);
});
console.log("I want to cry");
//# sourceMappingURL=Entry.js.map