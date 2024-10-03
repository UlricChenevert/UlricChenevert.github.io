export default class HTMLFragmentElement extends HTMLElement {
    // fragmentLocation: string;
    // constructor(fragmentLocation: string) {
    //     super();
    //     this.fragmentLocation = fragmentLocation;
    // }
    connectedCallback() {
        let htmlFragmentRequest = new XMLHttpRequest();
        htmlFragmentRequest.onload = () => {
            this.innerHTML = htmlFragmentRequest.responseText;
        };
        htmlFragmentRequest.open("GET", "this.fragmentLocation");
        htmlFragmentRequest.send();
    }
}
