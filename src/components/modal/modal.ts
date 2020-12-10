import '../../style/modal.css'
import {Compute} from "../computePrice/computePrice";
import {Order, OrderPosition} from "../interface";

type MethodsType = {
    post: () => Promise<void>
    deleteOrder: (id: string) => Promise<OrderPosition[]>
}

type OptionsType = {
    orders: Order
    closeBtn: boolean
}

export class Modal {
    private readonly name: string
    private options: OptionsType
    private methods: MethodsType
    private modal: HTMLDivElement
    private compute: Compute
    private cancelBtn: Element
    private confirm: Element

    constructor(name: string, options: OptionsType, methods: MethodsType) {
        this.name = name
        this.options = options
        this.methods = methods
    }

    start() {
        const that = this
        function _createModal() {
            const modal = document.createElement('div')
            modal.classList.add('sModal')
            modal.insertAdjacentHTML(<"beforebegin" | "afterbegin" | "beforeend" | "afterend">'afterBegin', `
                <div class="modalOverlay" id=${that.name}>
                    <div class="modalWindow">
                        <div class="content">
                            <h4 class="mb1">Ваш заказ</h4>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Количество</th>
                                    <th>Цена</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody data-content>
                                </tbody>
                            </table>
                            <div class="orderSummary">
                                <p>Общая стоимость <strong data-price></strong></p>
                            </div>
                        </div>
                        ${that.options.closeBtn ? `<div class="footer"><button class="btnLeft" data-close="true" id="cancel">Close</button></div>`
                : `<div class="footer">
                            <button class="btnLeft" data-close="true" id="cancel">Cancel</button>
                            <button class="btnRight" data-confirm="true" id="confirm">Confirm</button>
                        </div> `}
                    </div>
                </div>
            `)
            document.body.appendChild(modal)
            return modal
        }
        this.removeChild()
        this.modal = _createModal()
        this.modal.classList.add('open')
        const el = document.querySelector('#' + this.name)
        this.cancelBtn = el.querySelector('.btnLeft')
        this.cancelBtn.addEventListener('click', this.closeModal.bind(this))
        this.modal.addEventListener('click', this.deleteOrder.bind(this))

        this.render()

        if (!this.options.closeBtn) {
            this.confirm = el.querySelector('.btnRight')
            this.confirm.addEventListener('click', this.confirmOrders.bind(this))
        }
    }

    toHTML(o: OrderPosition) {
        return `<tr>
            <td>${o.name}</td>
            <td>${o.quantity}</td>
            <td>${o.cost} $.</td>
            ${this.options.closeBtn ? '' : `<td><button class="deleteBtn" data-id=${o._id}>delete</button></td>`}
        </tr>`
    }

    render() {
        this.modal.querySelector('[data-content]').innerHTML = this.options.orders.list.map(o => this.toHTML(o)).join('')
        this.modal.querySelector('[data-price]').innerHTML = `<strong>${this.options.orders.list ? this.computePrice(this.options.orders.list) : 0}$.</strong>`
    }

    computePrice = (list: OrderPosition[]) => {
        this.compute = new Compute(list)
        return this.compute.result()
    }

    removeChild() {
        const parents = document.querySelector('.sModal')
        if (parents) {
            parents.parentNode.removeChild(parents)
        }
    }

    closeModal() {
        this.modal.classList.remove('open')
        this.removeChild()
    }

    confirmOrders() {
        this.methods.post()
        this.closeModal()
    }

    async deleteOrder(event: any) {
        const id = event.target.dataset.id
        if (id) {
            this.options.orders.list = await this.methods.deleteOrder(id)
            this.render()
        }
    }
}
