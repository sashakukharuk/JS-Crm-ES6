import {DataOrderPage} from "./data";

export function LogicOrderPage() {
    this._orders = []
    this._data = new DataOrderPage()

    this.getOrders = async (id) => {
        if (this._orders.length === 0) {
            this._orders = await this._data.getOrders(id)
            return this._orders
        } else {
            return this._orders
        }
    }

    this.getAddedOrders = async () => {
        return await this._data.getOrdersLocal()
    }

    this.setOrder = async (order) => {
        this._data.setOrderAC(order)
    }

    this.postOrders = async () => {
        const list = await this._data.getOrdersLocal()
        const data = {
            list: list
        }
        this._data.requestPostOrders(data)
        this.clearLocalStorage()
    }

    this.clearOrders = () => {
        this._data.deleteDataOrders()
        this._orders = []
    }

    this.deleteOrder = async (id) => {
        await this.getOrders()
        const order = this._orders.find(order => order._id === id && order)
        this._data.deleteOrder(order)
        return await this._data.getOrdersLocal()
    }

    this.clearLocalStorage = () => {
        this._data.deleteAllOrders()
    }
}