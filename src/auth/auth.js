import {LogicAuth} from "./logic";
import '../style/auth.css'
import {AuthForm} from "./authForm";

export function AuthPage() {
    this._logic = new LogicAuth()
    this.start = (callback) => {
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

        this.render = () => {
            this.myRouter(callback)

            this.activeRoutes = document.querySelectorAll('[data-route]')
            this.activeRoutes.forEach(route => route.addEventListener('click', (e) => this.renderOfRouter(e)))
        }
        this.render()
    }

    this.myRouter = (callback) => {
        this.myFirstRoute = [
            {
                path: '?login',
                render: () => this.renderAuth({
                    name: 'Login in',
                    btn: 'Login'
                }, async (auth) => {
                    await this._logic.postLogin(auth)
                    window.history.pushState({}, 'name', "/CRM.html")
                    this.removeChild()
                    this.header.parentNode.removeChild(this.header)
                    callback()
                })
            },
            {
                path: '?register',
                render: () => this.renderAuth({
                    name: 'Register',
                    btn: 'Register'
                }, async (auth) => {
                    await this._logic.postRegister(auth)
                    window.history.pushState({}, 'name', "?login")
                    this.render()
                })
            },
        ]
        const str = window.location.href.replace('http://localhost:8080/CRM.html', '')
        this.myFirstRoute.map(route => {
            if (route.path === str) {
                route.render()
            }
        })
    }

    this.renderOfRouter = (e) => {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', route)
            this.myRouter()
        }
    }

    this.removeChild = () => {
        const form = document.querySelector('.sAuth')
        if (form) {
            form.parentNode.removeChild(form)
        }
    }

    this.renderAuth = (options, callback) => {
        this.removeChild()
        const auth = new AuthForm()
        auth.start(options, callback)
    }
}