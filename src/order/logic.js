import {DataOrderPage} from "./data";

export class LogicOrderPage extends DataOrderPage {
    constructor() {
        super()
        this.orders = null
    }

    async getOrders(id) {
        return this.orders = await this.requestGetOrders(id)
    }

    async getAddedOrdersLocal() {
        return await this.getOrdersLocal()
    }

    setOrder(order) {
        this.setOrderAC(order)
    }

    async postOrders() {
        const list = await this.getOrdersLocal()
        await this.requestPostOrders({list: list})
        this.clearLocalStorage()
    }

    clearOrders() {
        this.deleteDataOrders()
    }

    async deleteOrder(id) {
        await this.getOrders()
        const order = this.orders.find(order => order._id === id && order)
        await this.deleteOrderLocal(order)
        return await this.getOrdersLocal()
    }

    clearLocalStorage() {
        this.deleteAllOrders()
    }
}