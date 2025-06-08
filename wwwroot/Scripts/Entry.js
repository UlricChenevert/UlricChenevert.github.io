// import ko from "./Libraries/knockout.js"
import { injectHTMLFromFile } from "./modularHTML.js";
const pageElement = document.getElementById("custom-article");
document.addEventListener("DOMContentLoaded", (e) => {
    injectHTMLFromFile(new URL(window.location.origin + '/HTML/homepage.html'), pageElement);
    window.ko.applyBindings({ name: "William" });
});
