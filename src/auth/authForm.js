import {Input} from "../components/inputControls/inputControls";

export class AuthForm {
    constructor(options, callback) {
        this.options = options
        this.callback = callback
        this.email = new Input('email', 'text', 'data-input')
        this.password = new Input('password', 'password', 'data-auth-input', 6)
    }
    start() {
        const that = this
        function _createForm() {
            const authForm = document.createElement('div')
            authForm.classList.add('sAuth')
            authForm.insertAdjacentHTML('afterbegin', `
                <form class="block">
                    <div class="card">
                        <div class="content">
                            <span class="cardTitle">${that.options.name}</span>
                            <div class="field" data-input>
                            </div>
                            <div class="field" data-auth-input>
                            </div>
                        </div>
                        <div class="action">
                            <button type="submit" id="btnForm" class="btn">
                                ${that.options.btn}
                            </button>
                        </div>
                    </div>
                </form>
                `)
            document.body.appendChild(authForm)
            return authForm
        }
        _createForm()
        this.email.start()
        this.password.start()
        this.btnForm = document.getElementById('btnForm')
        this.btnForm.addEventListener('click', this.loginRegister.bind(this))
    }

    loginRegister() {
        this.btnForm.classList.add('active')
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const auth = {
            email: email,
            password: password
        }
        this.callback(auth)
    }
}