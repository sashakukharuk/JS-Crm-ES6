import {App} from "./app";
window.onload = () => {
    const app = new App()
    app.start()
}
window.addEventListener('beforeunload', () => console.log('render'))
