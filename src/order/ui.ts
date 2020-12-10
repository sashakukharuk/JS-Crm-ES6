import {LogicOrderPage} from "./logic";
import '../style/order.css'

export class UiOrderPage extends LogicOrderPage {
    private completeBtn: HTMLButtonElement
    public disabled: boolean
    private render: () => Promise<void>;
    private btnAdd: NodeListOf<Element>;
    constructor() {
        super()
    }

    start() {
        function pageOrder () {
            const orderPage = document.createElement('div')
            orderPage.classList.add('order')
            orderPage.insertAdjacentHTML('afterbegin', `
            <table class="table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Стоимость</th>
                        <th>Количество</th>
                        <th></th>
                    </tr>
                    <tbody data-content-orders="true">
                    </tbody>
                </thead>
            </table>`)
            document.querySelector('[data-content-order]').appendChild(orderPage)
            return orderPage
        }

        this.render = async () => {
            const page = pageOrder()
            page.querySelector('[data-content-orders]').innerHTML = await this.getOrderHTML()
            const btn: any = document.getElementById('completeBtn')
            this.btnAdd = document.querySelectorAll('[data-name]')
            this.completeBtn = btn
            this.completeBtn.addEventListener('click', this.openModal.bind(this))
            this.btnAdd.forEach(add => add.addEventListener('click', this.addOrder.bind(this)))
            await this.getAddedOrders()
        }
        this.render()
    }

    async getAddedOrders() {
        const orders = await this.getAddedOrdersLocal()
        if (orders.length === 0) {
            this.completeBtn.classList.add('active')
            this.completeBtn.disabled = true
        } else {
            this.completeBtn.classList.remove('active')
        }
    }

    async openModal() {
        await this.startModal().then(() => this.getAddedOrders())
    }

    addOrder(event: any) {
        const id = event.target.dataset.id
        this.completeBtn.classList.remove('active')
        this.completeBtn.disabled = false
        this.setOrder(id, event)
    }
}
