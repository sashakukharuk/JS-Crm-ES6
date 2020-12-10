import '../../style/validation.css'
import {ListenersValidation} from "./listener-validation";

export class Input {
    private readonly name: string;
    private type: string;
    private data: string;
    private readonly minSymbol: number;
    private readonly maxSymbol: number;
    private value: string;
    private validation: ListenersValidation;
    constructor(name: string, type: string, data: string, minSymbol: number, maxSymbol: number, value: string) {
        this.name = name
        this.type = type
        this.data = data
        this.minSymbol = minSymbol
        this.maxSymbol = maxSymbol
        this.value = value
    }

    start() {
        const that = this
        function _create() {
            const vd = document.createElement('div')
            vd.insertAdjacentHTML('afterbegin', `
            <input id=${that.name} type=${that.type} name=${that.name} ${that.value ? `value=${that.value}` : ''} placeholder=${that.name}>
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
