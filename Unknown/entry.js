import { Entity } from "./State/Entity.js";
document.addEventListener('DOMContentLoaded', () => {
    let a = new Entity();
    let b = new Entity();
    let c = new Entity();
    console.log(a.id);
    console.log(b.id);
    console.log(c.id);
});
document.addEventListener('onkeyup', (event) => {
    console.log(event);
});
