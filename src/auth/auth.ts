import '../style/auth.css'
import {LogicAuth} from "./logic";

export class AuthPage extends LogicAuth {
    private activeRoutes: NodeListOf<Element>;
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
                       <a data-route='login' id="login">Login in</a>
                    </div>
                    <div class="login">
                        <a data-route='register' id="register">Register</a>
                    </div>
                </div>
            </div>
            
            `)
            document.body.appendChild(authForm)
            return authForm
        }

        _createAuthForm()
        this.myRouter()
        this.activeRoutes = document.querySelectorAll('[data-route]')
        this.activeRoutes.forEach(route => route.addEventListener('click', (e) => this.renderOfRouter(e)))
    }

    renderOfRouter(e: any) {
        const route = e.target.dataset.route
        if (route) {
            window.history.pushState({}, 'name', route)
            this.myRouter()
        }
    }
}
