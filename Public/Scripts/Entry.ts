import * as ko from "../Libraries/knockout.js";
import { main } from "./Main.js";
import { PageModel } from "./PageModel.js";

const pageElement = <HTMLElement>document.getElementById("custom-article")

document.addEventListener("DOMContentLoaded", (e)=> {
    main(pageElement)
    // ko.applyBindings(PageModel);
})

console.log("What")