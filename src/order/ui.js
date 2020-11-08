import {LogicOrderPage} from "./logic";
import '../style/order.css'
import {Modal} from "../components/modal/modal";
export class UiOrderPage extends LogicOrderPage {
    constructor() {
        super()
        this.completeBtn = null
    }

    start(id) {
        function pageOrder (orders) {
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
                <tbody data-content>
                ${orders && orders.map(o=>`<tr id=${'gffgfgf' + o._id}>
                    <td id="name">${o.name}</td>
                    <td><i id="cost">${o.cost}</i> $.</td>
                    <td>
                        <div class="field">
                            <input type="number" value="1" min="1" id="quantity">
                        </div>
                    </td>
                    <td>
                        <button class="btn" data-btn="true" data-name=${'gffgfgf' + o._id} data-id=${o._id} id="addBtn">Add</button>
                    </td>
                </tr>`)}
                </tbody>
                </thead>
            </table>`)
            document.querySelector('[data-content-order]').appendChild(orderPage)
            return orderPage
        }

        this.render = async () => {
            this.clearOrders()
            const orders = await this.getOrders(id)
            this.order = pageOrder(orders)

            this.completeBtn = document.getElementById('completeBtn')
            this.completeBtn.addEventListener('click', this.openModal.bind(this))
            this.order.addEventListener('click', this.addOrder.bind(this))
            this.getAddedOrders()
        }

        this.render()
    }

    async getAddedOrders() {
        const orders = await this.getAddedOrdersLocal()
        if (orders.length === 0) {
            this.completeBtn.classList.add('active')
            this.completeBtn.disabled = true
        }
    }

    async openModal() {
        const orders = await this.getAddedOrdersLocal()
        this._modal = new Modal('orderModal',{
                orders: {list: orders},
                closeBtn: false
            },
            {
                post: async () => {await this.postOrders(); await this.getAddedOrders()},
                clear: () => this.clearOrders(),
                deleteOrder: async (id) => {
                    const orders = await this.deleteOrder(id)
                    await this.getAddedOrders()
                    return orders
                }
            })
        this._modal.start()
    }

    addOrder(event) {
        const id = event.target.dataset.id
        if (id) {
            this.completeBtn.classList.remove('active')
            this.completeBtn.disabled = false
            const idOrder = '#' + event.target.dataset.name
            const el = document.querySelector(idOrder)
            const name = el.querySelector('#name').innerHTML
            const cost = +el.querySelector('#cost').innerHTML
            const quantity = +el.querySelector('#quantity').value
            const order =  {
                _id: id,
                name: name,
                cost: cost,
                quantity: quantity
            }
            this.setOrder(order)
            this.completeBtn.disabled = false
        }
    }
}