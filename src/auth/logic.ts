import {DataAuth} from "./data";
import {User} from "../components/interface";
import {AuthForm} from "./authForm";

export class LogicAuth extends DataAuth {
    constructor() {
        super()
    }
    async postLogin(auth: User) {
        await this.requestPostLogin(auth)
    }

    async postRegister(auth: User) {
        await this.requestPostRegister(auth)
    }

    removeChild() {
        const form = document.querySelector('.sAuth')
        if (form) {
            form.parentNode.removeChild(form)
        }
    }

    myRouter() {
        const myFirstRoute = [
            {
                path: 'login',
                name: 'Login',
                render: () => this.renderLogin()
            },
            {
                path: 'register',
                name: 'Register',
                render: () => this.renderRegister()
            },
        ]
        const str = window.location.pathname.replace('/', '')
        myFirstRoute.map(route => {
            if (route.path === str) {
                route.render()
            }
        })
    }

    renderLogin() {
        const header = document.querySelector('.sHeader')
        this.renderAuth({
            name: 'Login in',
            btn: 'Login'
        }, async (auth: User) => {
            await this.postLogin(auth)
            window.history.pushState({}, 'name', "/")
            this.removeChild()
            header.parentNode.removeChild(header)

        })
    }

    renderRegister() {
        this.renderAuth({
            name: 'Register',
            btn: 'Register'
        }, (auth: User) => {
            this.postRegister(auth)
            window.history.pushState({}, 'name', "login")
            this.myRouter()
        })
    }

    renderAuth(options: { name: string; btn: string; }, callback: { (auth: User): void}) {
        this.removeChild()
        const auth = new AuthForm(options, callback)
        auth.start()
    }
}
