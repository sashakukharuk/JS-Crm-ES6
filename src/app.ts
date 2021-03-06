import {LogicApp} from "./LogicApp";
import './style/App.css'
import './style/sidebar.css'
import {Router} from "./components/router/router";
export class App extends LogicApp {
    private app: HTMLDivElement;
    private router: Router;
    private pages: NodeListOf<Element>;
    constructor() {
        super()
        this.router = new Router()
    }

    async start() {
        function _createAppPage() {
            const App = document.createElement('div')
            App.classList.add('App')
            App.insertAdjacentHTML('afterbegin', `
            <div class="sidenav">
                <div class="header">
                    <h4>Newborn</h4>
                </div>
                <div class="bold"><a data-route="overview" id="overview">Обзор</a></div>
                <div class="bold"><a data-route="analytics" id="analytics">Аналитика</a></div>
                <div class="bold"><a data-route="history" id="history">История</a></div>
                <div class="bold"><a data-route="order" id="order">Добавить заказ</a></div>
                <div class="bold "><a data-route="categories" id="categories">Ассортимент</a></div>
                <div class="bold"><a data-route="login" id="out">Выйти</a></div>
            </div>
            <div class="block__content">
                <div class="block__preloader" data-preloader></div>
                <main data-content class="content"></main>
            </div>
        `)
            document.body.appendChild(App)
            return App
        }
        const token = await this.getToken()
        if (!token) {
            window.history.pushState({}, 'name', "/login")
        } else {
            window.history.pushState({}, 'name', "/")
            this.app = _createAppPage()
        }
        this.pages = document.querySelectorAll('[data-route]')
        this.pages.forEach(route => route.addEventListener('click', this.renderPage.bind(this)))
        this.router.myRouter()
    }

    renderPage(e: { target: { dataset: { route: string; }; }; }) {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', `/${route}`)
            if (route === 'login') {
                this.removeToken()
                this.app.parentNode.removeChild(this.app)
            }
            this.router.myRouter()
        }
    }
}
