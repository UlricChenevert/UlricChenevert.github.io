export default class HTMLNavigationElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let htmlFragmentRequest = new XMLHttpRequest();
        htmlFragmentRequest.onload = () => {
            this.innerHTML = htmlFragmentRequest.responseText;
        };
        htmlFragmentRequest.open("GET", "../Fragments/naviagation-bar.html");
        htmlFragmentRequest.send();
        // console.log("Huh")
        // this.innerHTML = `
        // <nav>
        //     <span> My Nav Bar </span>
        //     <a href="www.google.com"> Google </a>
        //     <a href="www.google.com"> Google </a>
        //     <a href="www.google.com"> Google </a>
        //     <a href="www.google.com"> Google </a>
        // </nav>
        // `;
    }
}
