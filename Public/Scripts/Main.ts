export const main = (element : HTMLElement) => {
    fetch('/HTML/homepage.html')
        .then((response)=>{ return response.text()})
        .then((text)=>{ element.innerHTML += text })
}