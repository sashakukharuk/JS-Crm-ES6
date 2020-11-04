import {LogicApp} from "./LogicApp";
import {OrderCategories} from "./order/orderCategories";
import {CategoriesPage} from "./categories/categories";
import {AuthPage} from "./auth/auth";
import {HistoryPage} from "./history/history";
import {AnalyticsPage} from "./analytics/analytics";
import {OverviewPage} from "./overview/overview";
import './style/App.css'
import './style/sidebar.css'
export function App() {
    this.myRouter = []
    this.app = null
    this._logic = new LogicApp()
    this._addOrderPage = new OrderCategories()
    this._categoriesPage = new CategoriesPage()
    this._authPage = new AuthPage()
    this._historyPage = new HistoryPage()
    this._analyticsPage = new AnalyticsPage()
    this._overviewPage = new OverviewPage()
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
            this.activeRoutes.forEach(route => route.addEventListener('click', (e) => this.renderOfRouter(e)))
        }

        await this.render()
        this.myRouter()
    }
    this.myRouter = () => {
        this.myFirstRoute = [
            {
                path: '/CRM.html',
                name: 'Root'
            },
            {
                path: '?overview',
                name: 'Overview',
                render: this.renderOverview
            },
            {
                path: '?analytics',
                name: 'Analytics',
                render: this.renderAnalytics
            },
            {
                path: '?history',
                name: 'Order',
                render: this.renderHistory
            },
            {
                path: '?order',
                name: 'Order',
                render: this.renderOrderCategories
            },
            {
                path: '?categories',
                name: 'Categories',
                render: this.renderCategories
            },
            {
                path: '?login',
                name: 'Login',
                render: this.checkOut
            }
        ]
        const pathWindow = window.location.href
        const str = pathWindow.replace('http://localhost:8080/CRM.html', '')
        this.myFirstRoute.map(route => {
            if (route.path === str) {
                route.render()
            }
        })
    }
    this.removeChild = () => {
        const parents = document.querySelector('.content')
        if (parents.firstChild) {
            parents.removeChild(parents.firstChild)
        }
    }

    this.renderOfRouter = (e) => {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', route)
            this.myRouter()
        }
    }

    this.renderOverview = () => {
        this.removeChild()
        window.history.pushState({}, 'name', "?overview")
        this._overviewPage.start()
    }

    this.renderAnalytics = () => {
        this.removeChild()
        window.history.pushState({}, 'name', "?analytics")
        this._analyticsPage.start()
    }

    this.renderHistory = () => {
        this.removeChild()
        window.history.pushState({}, 'name', "?history")
        this._historyPage.start()
    }

    this.renderOrderCategories = () => {
        this.removeChild()
        window.history.pushState({}, 'name', "?order")
        this._addOrderPage.start()
    }

    this.renderCategories = () => {
        this.removeChild()
        window.history.pushState({}, 'name', "?categories")
        this._categoriesPage.start()
    }

    this.checkOut = () => {
        window.history.pushState({}, 'name', "?login")
        if (this.app) {
            this._logic.removeToken()
            this.app.parentNode.removeChild(this.app)
        }
        this._authPage.start(() => {
            this.render()
            this.myRouter()
        })
    }
}