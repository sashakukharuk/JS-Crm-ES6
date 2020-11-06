import {AuthPage} from "../../auth/auth";
import {HistoryPage} from "../../history/history";
import {AnalyticsPage} from "../../analytics/analytics";
import {OverviewPage} from "../../overview/overview";
import {OrderCategories} from "../../order/orderCategories";
import {CategoriesPage} from "../../categories/categories";

export class Router {
    constructor() {
        this._addOrderPage = new OrderCategories()
        this._categoriesPage = new CategoriesPage()
        this._historyPage = new HistoryPage()
        this._analyticsPage = new AnalyticsPage()
        this._overviewPage = new OverviewPage()
        this._authPage = new AuthPage()
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
                render: that._overviewPage.start
            },
            {
                path: '?analytics',
                name: 'Analytics',
                render: that._analyticsPage.start
            },
            {
                path: '?history',
                name: 'Order',
                render: that._historyPage.start
            },
            {
                path: '?order',
                name: 'Order',
                render: that._addOrderPage.start
            },
            {
                path: '?categories',
                name: 'Categories',
                render: that._categoriesPage.start
            },
            {
                path: '?login',
                name: 'Login',
                render: that._authPage.start
            }
        ]
        const pathWindow = window.location.href
        const str = pathWindow.replace('http://localhost:8080/CRM.html', '')
        this.myFirstRoute.map(route => {
            if (route.path === str) {
                that.removeChild()
                window.history.pushState({}, 'name', str)
                route.render()
            }
        })
    }

    removeChild = () => {
        const parents = document.querySelector('.content')
        if (parents) {
            if (parents.firstChild) {
                parents.removeChild(parents.firstChild)
            }
        }
    }
}
