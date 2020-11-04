import {UtilRequest} from "../components/util";

export function HistoryData() {
    this._request = new UtilRequest()
    this._Store = {
        orders: [],
        offset: 0,
        limit: 7,
        filter: {order: '', start: '', end: ''},
        url: ''
    }

    this.getFilter = () => {
        return this._Store.filter
    }

    this.requestGetOrders = async (filter, STEP) => {
        this._Store.limit += STEP ? STEP : 0
        this._Store.url = `start=${this._Store.filter.start}&end=${this._Store.filter.end}&order=${this._Store.filter.order}&offset=${this._Store.offset}&limit=${this._Store.limit}`
        window.history.pushState({}, 'name', `?history?${this._Store.url}`)
        return this._request.start(`order?${this._Store.url}`, 'GET')
    }

    this.setFilter = (filter) => {
        this._Store.filter = filter
    }
}