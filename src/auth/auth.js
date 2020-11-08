import '../style/auth.css'
import {AuthForm} from "./authForm";
import {LogicAuth} from "./logic";

export class AuthPage extends LogicAuth {
    constructor() {
        super()
    }
    start() {
        function _createAuthForm() {
        const authForm = document.createElement('div')
        authForm.classList.add('sHeader')
        authForm.insertAdjacentHTML('afterbegin', `
            <div class="header">
                <div class="auth">
                    <div class="login">
                       <a data-route='?login' id="login">Login in</a>
                    </div>
                    <div class="login">
                        <a data-route='?register' id="register">Register</a>
                    </div>
                </div>
            </div>
            
            `)
            document.body.appendChild(authForm)
            return authForm
        }

        this.header = _createAuthForm()
        this.myRouter()
        this.activeRoutes = document.querySelectorAll('[data-route]')
        this.activeRoutes.forEach(route => route.addEventListener('click', (e) => this.renderOfRouter(e)))
    }

    myRouter() {
        this.myFirstRoute = [
            {
                path: '?login',
                name: 'Login',
                render: () => this.renderLogin()
            },
            {
                path: '?register',
                name: 'Register',
                render: () => this.renderRegister()
            },
        ]
        const str = window.location.href.replace('http://localhost:8080/CRM.html', '')
        this.myFirstRoute.map(route => {
            if (route.path === str) {
                route.render()
            }
        })
    }

    renderOfRouter(e) {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', route)
            this.myRouter()
        }
    }

    removeChild() {
        const form = document.querySelector('.sAuth')
        if (form) {
            form.parentNode.removeChild(form)
        }
    }

    renderLogin() {
        this.renderAuth({
            name: 'Login in',
            btn: 'Login'
        }, async (auth) => {
            await this.postLogin(auth)
            window.history.pushState({}, 'name', "/CRM.html")
            this.removeChild()
            this.header.parentNode.removeChild(this.header)

        })
    }

    renderRegister() {
        this.renderAuth({
            name: 'Register',
            btn: 'Register'
        }, (auth) => {
            this.postRegister(auth),
            window.history.pushState({}, 'name', "?login"),
            this.myRouter()
        })
    }

    renderAuth(options, callback) {
        this.removeChild()
        const auth = new AuthForm(options, callback)
        auth.start()
    }
}