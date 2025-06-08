export async function injectHTMLFromFile(filePath, element) {
    fetch(filePath)
        .then((response) => { return response.text(); })
        .then((text) => { element.innerHTML = text; });
}
