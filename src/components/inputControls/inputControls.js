import '../../style/validation.css'
import {ListenersValidation} from "./listener-validation";

export class Input {
    constructor(name, type, data, minSymbol, maxSymbol) {
        this.name = name
        this.type = type
        this.data = data
        this.minSymbol = minSymbol
        this.maxSymbol = maxSymbol
    }

    start() {
        const that = this
        function _create() {
            const vd = document.createElement('div')
            vd.insertAdjacentHTML('afterbegin', `
            <input id=${that.name} type=${that.type} name=${that.name} placeholder=${that.name}>
            <div id=${that.name + 's'} data-span="true"></div>
        `)
            document.querySelector(`[${that.data}]`).appendChild(vd)
            return vd
        }
        _create()
        this.validate()
    }

    validate() {
        this.validation = new ListenersValidation(this.name, this.minSymbol, this.maxSymbol)
        this.validation.start()
    }
}
