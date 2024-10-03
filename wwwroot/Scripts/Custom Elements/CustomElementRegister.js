import HTMLNavigationElement from "./HTMLNavigationElement.js";
import HTMLLogoElement from "./HTMLLogoElement.js";
let kindaConstructor = () => {
    return new HTMLNavigationElement();
};
// TODO: figure out how to extract away, so that you are creating templates by specifying location and label 
customElements.define("custom-logo", HTMLLogoElement);
customElements.define("navigation-bar", kindaConstructor);
