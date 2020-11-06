import {UtilRequest} from "../components/request/util";

export function DataOrderPage() {
    this._request = new UtilRequest()
    this._Store = {
        ordersData: [
            // {_id: 'fdgdfg', name: 'Coffee', cost: 50, quantity: 1},
            // {_id: 'ukukuku', name: 'Tea', cost: 20, quantity: 1},
            // {_id: 'qwqwqwqw', name: 'Ice', cost: 10, quantity: 1},
            // {_id: 'cxcxcxcx', name: 'Water', cost: 15, quantity: 1}
        ],
        orderData: [],
        token: '',
        instance: 'http://localhost:5000/api/'
    }

    this.getOrders = async (id) => {
        if (!id) {
            const str = window.location.href
            id = str.replace('http://localhost:8080/CRM.html?order?', '')
        }
        if (this._Store.ordersData.length === 0) {
            this._Store.ordersData = await this._request.start(`position/${id}`, 'GET')
            return this._Store.ordersData
        } else {
            return this._Store.ordersData
        }
    }

    this.requestPostOrders = async (data) => {
        await this._request.start(`order`, 'POST', JSON.stringify(data))
    }

    this.getOrdersLocal = async () => {
        const orders = await this.getOrders()
        const ordersLocal = orders.map(o => JSON.parse(localStorage.getItem(o._id)))
        return ordersLocal.filter(o => o ? o : '')
    }

    this.setOrderAC = (order) => {
        localStorage.setItem(order._id, JSON.stringify(order))
    }

    this.deleteDataOrders = () => {
        this._Store.ordersData = []
    }

    this.deleteOrder = (order) => {
        localStorage.removeItem(order._id, JSON.stringify(order))
    }

    this.deleteAllOrders = () => {
        localStorage.clear()
    }
}