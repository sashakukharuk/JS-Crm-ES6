import {LogicApp} from "./LogicApp";
import './style/App.css'
import './style/sidebar.css'
import {Router} from "./components/router/router";
export function App() {
    this.app = null
    this._logic = new LogicApp()
    this.router = new Router()
    this.start = async () => {
        function _createAppPage() {
            const App = document.createElement('div')
            App.classList.add('App')
            App.insertAdjacentHTML('afterbegin', `
            <div class="sidenav">
                <div class="header">
                    <h4>Newborn</h4>
                </div>
                <div class="bold"><a data-route="?overview" >Обзор</a></div>
                <div class="bold"><a data-route="?analytics" >Аналитика</a></div>
                <div class="bold"><a data-route="?history" >История</a></div>
                <div class="bold"><a data-route="?order" id="order">Добавить заказ</a></div>
                <div class="bold "><a data-route="?categories" id="categories">Ассортимент</a></div>
                <div class="bold"><a data-route="?login" id="out">Выйти</a></div>
            </div>
            <div class="block-content">
                <main data-content class="content"></main>
            </div>
        `)
            document.body.appendChild(App)
            return App
        }

        this.render = async () => {
            const token = await this._logic.getToken()
            !token ? window.history.pushState({}, 'name', "?login") : this.app = _createAppPage()

            this.activeRoutes = document.querySelectorAll('[data-route]')
            this.activeRoutes.forEach(route => route.addEventListener('click', this.renderOfRouter))
            if (this.app) {
                this.btnOut = document.getElementById('out')
                this.btnOut.addEventListener('click', this.checkOut.bind(this), {once: true})
            }
        }

        await this.render()
        this.router.myRouter()
    }

    this.renderOfRouter = (e) => {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', route)
            this.router.myRouter()
        }
    }

    this.checkOut = () => {
        if (this.app) {
            this._logic.removeToken()
            this.app.parentNode.removeChild(this.app)
        }
    }
}