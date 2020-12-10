import {UtilRequest} from "../components/request/util";
import {Order, OrderPosition} from "../components/interface";

export class DataOrderPage {
    private request: UtilRequest;
    constructor() {
        this.request = new UtilRequest()
    }

    async requestGetOrders(): Promise<OrderPosition[]> {
        const str = window.location.pathname
        const id = str.replace('order/', '')
        return await this.request.start(`position/${id}`, 'GET')
    }

    async requestPostOrders(order: Order) {
        await this.request.start(`order`, 'POST', JSON.stringify(order))
    }

    async getOrdersLocal(): Promise<OrderPosition[]> {
        const orders = await this.requestGetOrders()
        const ordersLocal = orders.map(o => JSON.parse(localStorage.getItem(o._id)))
        return ordersLocal.filter(o => o ? o : '')
    }

    setOrderAC(order: OrderPosition) {
        localStorage.setItem(order._id, JSON.stringify(order))
    }

    deleteOrderLocal(order: OrderPosition) {
        // @ts-ignore
        localStorage.removeItem(order._id, JSON.stringify(order))
    }

    deleteAllOrders() {
        localStorage.clear()
    }
}
