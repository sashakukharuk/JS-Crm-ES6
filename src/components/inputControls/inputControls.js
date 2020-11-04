import '../../style/validation.css'

export function InputControls() {
    this.start = (name, type, data, minSymbol, maxSymbol) => {
        function _createVd() {
            const vd = document.createElement('div')
            vd.insertAdjacentHTML('afterbegin', `
                <input id=${name} type=${type} name=${name} placeholder=${name}>
                <div id=${name + 's'} data-span></div>
            `)
            document.querySelector(`[${data}]`).appendChild(vd)
            return vd
        }
        this.vd = _createVd()
        this.input = document.getElementById(`${name}`)
        this.input.addEventListener('focus', this.focus)
        this.input.addEventListener('focusout', () => this.focusout(name, minSymbol, maxSymbol))
        this.input.addEventListener('keyup', () => this.focusout(name, minSymbol, maxSymbol))
    }

    this.focus = () => {
        if (!this.input.classList.value) {
            this.input.classList.add('focus')
        }
    }

    this.focusout = (name, minSymbol, maxSymbol) => {
        this.input.classList.remove('focus')
        if (this.input.value.length === 0) {
            this.input.classList.add('validate')
            return this.vd.querySelector('[data-span]').innerHTML = `<span style="color: red">enter ${name}</span>`
        } else {
            this.removeChild(name)
        }
        if (minSymbol) {
            if (this.input.value.length < minSymbol) {
                this.input.classList.add('validate')
                this.vd.querySelector('[data-span]').innerHTML = `<span style="color: red">${name} min ${minSymbol} symbol</span>`
            }
        }
        if (maxSymbol) {
            if (this.input.value.length > maxSymbol) {
                this.input.classList.add('validate')
                this.vd.querySelector('[data-span]').innerHTML = `<span style="color: red">${name} max ${maxSymbol} symbol</span>`
            }
        }
    }

    this.removeChild = (name) => {
        this.input.classList.remove('validate')
        const span = document.getElementById(`${name + 's'}`)
        if (span.firstChild) {
            span.removeChild(span.firstChild)
        }
    }

}