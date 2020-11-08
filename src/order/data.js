import {UtilRequest} from "../components/request/util";

export class DataOrderPage {
    constructor() {
        this._request = new UtilRequest()
        this.orders = []
    }

    async requestGetOrders(id) {
        if (!id) {
            const str = window.location.href
            id = str.replace('http://localhost:8080/CRM.html?order?', '')
        }
        if (this.orders.length === 0) {
            this.orders = await this._request.start(`position/${id}`, 'GET')
            return this.orders
        } else {
            return this.orders
        }
    }

    async requestPostOrders(data) {
        await this._request.start(`order`, 'POST', JSON.stringify(data))
    }

    async getOrdersLocal() {
        const orders = await this.requestGetOrders()
        const ordersLocal = orders.map(o => JSON.parse(localStorage.getItem(o._id)))
        return ordersLocal.filter(o => o ? o : '')
    }

    setOrderAC(order) {
        localStorage.setItem(order._id, JSON.stringify(order))
    }

    deleteDataOrders() {
        this.orders = []
    }

    deleteOrderLocal(order) {
        localStorage.removeItem(order._id, JSON.stringify(order))
    }

    deleteAllOrders() {
        localStorage.clear()
    }
}