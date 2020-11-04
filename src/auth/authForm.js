import {InputControls} from "../components/inputControls/inputControls";

export function AuthForm() {
    this.start = (options, callback) => {
        this.email = new InputControls()
        this.password = new InputControls()
        function _createForm() {
            const authForm = document.createElement('div')
            authForm.classList.add('sAuth')
            authForm.insertAdjacentHTML('afterbegin', `
                <div class="block">
                    <div class="card">
                        <div class="content">
                            <span class="cardTitle">${options.name}</span>
                            <div class="field" data-input>
                            </div>
                            <div class="field" data-auth-input>
                            </div>
                        </div>
                        <div class="action">
                            <button id="btnForm" class="btn">
                                ${options.btn}
                            </button>
                        </div>
                    </div>
                </div>
                `)
            document.body.appendChild(authForm)
            return authForm
        }
        _createForm()
        this.email.start('email', 'text', 'data-auth-input')
        this.password.start('password', 'password', 'data-auth-input', 6)
        this.btnForm = document.getElementById('btnForm')
        this.btnForm.addEventListener('click', () => this.loginRegister(callback), {once: true})
    }

    this.loginRegister = (callback) => {
        this.btnForm.classList.add('active')
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const auth = {
            email: email,
            password: password
        }
        callback(auth)
    }
}