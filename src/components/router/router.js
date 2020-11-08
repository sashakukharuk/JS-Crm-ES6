import {AuthPage} from "../../auth/auth";
import {HistoryPage} from "../../history/history";
import {AnalyticsPage} from "../../analytics/analytics";
import {OverviewPage} from "../../overview/overview";
import {OrderCategories} from "../../order/orderCategories";
import {CategoriesPage} from "../../categories/categories";
import '../../style/sidebar.css'
export class Router {
    constructor() {
        this._addOrderPage = new OrderCategories()
        this._categoriesPage = new CategoriesPage()
        this._historyPage = new HistoryPage()
        this._analyticsPage = new AnalyticsPage()
        this._overviewPage = new OverviewPage()
        this._authPage = new AuthPage()
        this.route = null
    }
    myRouter() {
        const that = this
        this.myFirstRoute = [
            {
                path: '/CRM.html',
                name: 'Root'
            },
            {
                path: '?overview',
                name: 'Overview',
                render: () => this._overviewPage.start()
            },
            {
                path: '?analytics',
                name: 'Analytics',
                render: () => this._analyticsPage.start()
            },
            {
                path: '?history',
                name: 'Order',
                render: () => this._historyPage.start()
            },
            {
                path: '?order',
                name: 'Order',
                render: () => this._addOrderPage.start()
            },
            {
                path: '?categories',
                name: 'Categories',
                render: () => this._categoriesPage.start()
            },
            {
                path: '?login',
                name: 'Login',
                render: () => this._authPage.start()
            }
        ]
        const pathWindow = window.location.href
        const str = pathWindow.replace('http://localhost:8080/CRM.html', '')
        this.myFirstRoute.map(route => {
            if (route.path === str) {
                this.unActivePage()
                this.activePage(str)
                that.removeChild()
                window.history.pushState({}, 'name', str)
                route.render()
            }
        })
    }

    removeChild() {
        const parents = document.querySelector('.content')
        if (parents) {
            if (parents.firstChild) {
                parents.removeChild(parents.firstChild)
            }
        }
    }

    activePage(route) {
        this.route = route
        if (route !== '?login') {
            const page = document.getElementById(route)
            page.classList.add('active')
        }
    }

    unActivePage() {
        if (this.route) {
            const page = document.getElementById(this.route)
            page.classList.remove('active')
        }
    }
}
