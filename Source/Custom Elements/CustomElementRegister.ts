import HTMLNavigationElement from "./HTMLNavigationElement.js"
import HTMLLogoElement from "./HTMLLogoElement.js"
import HTMLDropdownElement from "./HTMLDropdownElement.js"



// TODO: figure out how to extract away, so that you are creating templates by specifying location and label 
// I would have to figure out how to pass the constructor into the customElements register

customElements.define("custom-logo", HTMLLogoElement );
customElements.define("navigation-bar", HTMLNavigationElement);
customElements.define("dropdown", HTMLDropdownElement);