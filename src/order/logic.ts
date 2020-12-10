import {DataOrderPage} from "./data";
import {OrderPosition} from "../components/interface";
import {Preloader} from "../components/preloader/preloader";
import {Modal} from "../components/modal/modal";
import {ObjectHtml} from "../components/html/object-html";

export class LogicOrderPage extends DataOrderPage {
    private preloader: Preloader;
    constructor() {
        super()
        this.preloader = new Preloader()
    }

    async getOrders() {
        this.preloader.start()
        return await this.requestGetOrders().then(res => {
            this.preloader.removePreloader()
            return res
        })
    }

    async getAddedOrdersLocal() {
        return await this.getOrdersLocal()
    }

    async getOrderHTML() {
        const toHTML = (order: OrderPosition) =>`
        <tr id=${'gffgfgf' + order._id}>
            <td id="name">${order.name}</td>
            <td><i id="cost">${order.cost}</i> $.</td>
            <td>
                <div class="field">
                    <input type="number" value="1" min="1" id="quantity">
                </div>
            </td>
            <td>
                <button class="btn" data-btn="true" data-name=${'gffgfgf' + order._id} data-id=${order._id} id="addBtn">Add</button>
            </td>
        </tr>`
        return await new ObjectHtml(toHTML, this.getOrders.bind(this), 'Position').getItemInHTML()
    }

    setOrder(id: string, event: any) {
        const idOrder = '#' + event.target.dataset.name
        const el = document.querySelector(idOrder)
        const name = el.querySelector('#name').innerHTML
        const cost = +el.querySelector('#cost').innerHTML
        const element: any = el.querySelector('#quantity')
        const quantity: number = Number(element.value)
        const order: OrderPosition = {_id: id, name, cost, quantity}
        this.setOrderAC(order)
    }

    async postOrders() {
        const list: OrderPosition[] = await this.getOrdersLocal()
        await this.requestPostOrders({list: list})
        this.clearLocalStorage()
    }

    async deleteOrder(id: string): Promise<OrderPosition[]> {
        const orders = await this.getOrders()
        const order = orders.find(order => order._id === id && order)
        await this.deleteOrderLocal(order)
        return await this.getOrdersLocal()
    }

    clearLocalStorage() {
        this.deleteAllOrders()
    }

    async startModal() {
        const orders = await this.getAddedOrdersLocal()
        new Modal('orderModal', {
            orders: {list: orders},
            closeBtn: false
        }, {
            post: async () => await this.postOrders(),
            deleteOrder: async (id: string) => await this.deleteOrder(id)
        }).start()
    }
}
