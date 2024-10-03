export default class HTMLNavigationElement extends HTMLElement {
    connectedCallback() {
        let htmlFragmentRequest = new XMLHttpRequest();
        htmlFragmentRequest.onload = () => {
            this.innerHTML = htmlFragmentRequest.responseText;
        };
        htmlFragmentRequest.open("GET", "../Fragments/navigation-bar.html");
        htmlFragmentRequest.send();
    }
}
