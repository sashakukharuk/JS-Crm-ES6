import {AuthPage} from "../../auth/auth";
import {HistoryPage} from "../../history/history";
import {AnalyticsPage} from "../../analytics/analytics";
import {OverviewPage} from "../../overview/overview";
import {OrderCategories} from "../../order/orderCategories";
import {CategoriesPage} from "../../categories/categories";
import '../../style/sidebar.css'
export class Router {
    private historyPage: HistoryPage;
    private analyticsPage: AnalyticsPage;
    private overviewPage: OverviewPage;
    private authPage: AuthPage;
    private myFirstRoute: any;
    private route: string;
    constructor() {
        this.historyPage = new HistoryPage()
        this.analyticsPage = new AnalyticsPage()
        this.overviewPage = new OverviewPage()
        this.authPage = new AuthPage()
    }
    myRouter() {
        const that = this
        this.myFirstRoute = [
            {
                path: '/',
                name: 'Root'
            },
            {
                path: 'overview',
                name: 'Overview',
                render: () => this.overviewPage.start()
            },
            {
                path: 'analytics',
                name: 'Analytics',
                render: () => this.analyticsPage.start()
            },
            {
                path: 'history',
                name: 'Order',
                render: () => this.historyPage.start()
            },
            {
                path: 'order',
                name: 'Order',
                render: () =>  new OrderCategories().start()
            },
            {
                path: 'categories',
                name: 'Categories',
                render: () => new CategoriesPage().start()
            },
            {
                path: 'login',
                name: 'Login',
                render: () => this.authPage.start()
            }
        ]
        const pathWindow = window.location.pathname
        const str = pathWindow.replace('/', '')
        this.myFirstRoute.map((route: { path: string; render: () => void; }) => {
            if (route.path === str) {
                this.unActivePage()
                this.activePage(str)
                that.removeChild()
                window.history.pushState({}, 'name', pathWindow)
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

    activePage(route: string) {
        this.route = route
        if (route !== 'login') {
            const page = document.getElementById(route)
            page.classList.add('active')
        }
    }

    unActivePage() {
        if (this.route) {
            const page = document.getElementById(this.route)
            if (page) {
                page.classList.remove('active')
            }
        }
    }
}
