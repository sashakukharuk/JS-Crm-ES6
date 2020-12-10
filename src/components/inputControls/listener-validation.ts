import {Validation} from "./validation";

export class ListenersValidation extends Validation {
    constructor(name: string, minSymbol: number, maxSymbol: number) {
        super(name, minSymbol, maxSymbol)
    }

    start() {
        this.input.addEventListener('focus', this.focus.bind(this))
        this.input.addEventListener('focusout', this.focusout.bind(this))
        this.input.addEventListener('keyup', this.keyup.bind(this))
    }

    focus() {
        this.input.classList.add('focus')
    }

    focusout () {
        this.input.classList.remove('focus')
        if (this.input.value.length === 0) {
            return this.validationFocus()
        } else {
            this.removeChild()
        }
        if (this.minSymbol) {
            this.validationMinSymbols()
        }
        if (this.maxSymbol) {
            this.validationMaxSymbols()
        }
    }

    keyup() {
        if (this.input.value.length === 0) {
            this.validationFocus()
        } else {
            this.removeChild()
        }
        if (this.maxSymbol) {
            this.validationMaxSymbols()
        }
    }
}
