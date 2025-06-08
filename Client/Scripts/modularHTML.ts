export async function injectHTMLFromFile(filePath : URL, element : HTMLElement) {
    fetch(filePath)
    .then((response)=>{return response.text()})
    .then((text)=>{element.innerHTML = text})
}