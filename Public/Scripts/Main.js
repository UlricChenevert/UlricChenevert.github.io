export const main = (element) => {
    fetch('/HTML/homepage.html')
        .then((response) => { return response.text(); })
        .then((text) => { element.innerHTML += text; });
};
//# sourceMappingURL=Main.js.map