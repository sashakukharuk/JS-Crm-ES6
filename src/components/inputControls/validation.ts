export class Validation {
    private readonly name: string;
    protected readonly minSymbol: number;
    protected readonly maxSymbol: number;
    protected input: any;
    private span: HTMLElement;
    constructor(name: string, minSymbol: number, maxSymbol: number) {
        this.name = name
        this.minSymbol = minSymbol
        this.maxSymbol = maxSymbol
        this.input = document.getElementById(`${this.name}`)
        this.span = document.getElementById(`${this.name + 's'}`)
    }
    validationFocus() {
        this.input.classList.add('validate')
        return this.span.innerHTML = `<span style="color: red">enter ${this.name}</span>`
    }

    validationMinSymbols() {
        if (this.input.value.length < this.minSymbol) {
            this.input.classList.add('validate')
            this.span.innerHTML = `<span style="color: red">${this.name} min ${this.minSymbol} symbols</span>`
        }
    }

    validationMaxSymbols() {
        if (this.input.value.length > this.maxSymbol) {
            this.input.classList.add('validate')
            this.span.innerHTML = `<span style="color: red">${this.name} max ${this.maxSymbol} symbols</span>`
        }
    }

    removeChild() {
        this.input.classList.remove('validate')
        if (this.span.firstChild) {
            this.span.removeChild(this.span.firstChild)
        }
    }
}
