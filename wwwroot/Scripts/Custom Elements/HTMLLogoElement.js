export default class HTMLLogoElement extends HTMLElement {
    connectedCallback() {
        let htmlFragmentRequest = new XMLHttpRequest();
        htmlFragmentRequest.onload = () => {
            this.innerHTML = htmlFragmentRequest.responseText;
        };
        htmlFragmentRequest.open("GET", "../Fragments/logo.html");
        htmlFragmentRequest.send();
    }
}
