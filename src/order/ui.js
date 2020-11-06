import {LogicOrderPage} from "./logic";
import '../style/order.css'
import {Modal} from "../components/modal/modal";
export function UiOrderPage() {
    this.completeBtn = null
    this._logic = new LogicOrderPage()
    this.start = function (id) {
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
            this._logic.clearOrders()
            const orders = await this._logic.getOrders(id)
            this.order = pageOrder(orders)

            this.completeBtn = document.getElementById('completeBtn')

            this.completeBtn.addEventListener('click', this.openModal)
            this.order.addEventListener('click', this.addOrder)
            this.getAddedOrders()
        }

        this.render()
    }

    this.getAddedOrders = async () => {
        const orders = await this._logic.getAddedOrders()
        if (orders.length === 0) {
            this.completeBtn.classList.add('active')
            this.completeBtn.disabled = true
        }
    }

    this.openModal = async () => {
        const orders = await this._logic.getAddedOrders()
        this._modal = new Modal('orderModal',{
                orders: {list: orders},
                closeBtn: false
            },
            {
                post: await this._logic.postOrders,
                clear: this._logic.clearOrders,
                deleteOrder: async (id) => await this._logic.deleteOrder(id)
            })
        this._modal.start()
    }

    this.addOrder = (event) => {
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
            this._logic.setOrder(order)
            this.completeBtn.disabled = false
        }
    }
}