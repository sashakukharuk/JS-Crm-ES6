import {Input} from "../components/inputControls/inputControls";
import {User} from "../components/interface";

export class AuthForm {
    private options: { name: string; btn: string };
    private readonly callback: { (auth: User): void };
    private email: Input;
    private password: Input;
    private btnForm: HTMLElement;
    constructor(options: { name: string; btn: string; }, callback: { (auth: User): void}) {
        this.options = options
        this.callback = callback
        this.email = new Input('email', 'text', 'data-input', 3, null, null)
        this.password = new Input('password', 'password', 'data-auth-input', 6,null, null)
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
        const emailElement: any = document.getElementById('email')
        const passwordElement: any = document.getElementById('password')
        const email: string = emailElement.value
        const password: string = passwordElement.value
        const auth = {
            email: email,
            password: password
        }
        this.callback(auth)
    }
}
