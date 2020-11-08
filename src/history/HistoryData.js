import {UtilRequest} from "../components/request/util";


export class HistoryData {
    constructor(offset, limit, order, start, end) {
        this._request = new UtilRequest()
        this.offset = offset
        this.limit = limit
        this.order = order
        this.start = start
        this.end = end
    }

    async requestGetOrders() {
        const url = `start=${this.start}&end=${this.end}&order=${this.order}&offset=${this.offset}&limit=${this.limit}`
        window.history.pushState({}, 'name', `?history?${url}`)
        return this._request.start(`order?${url}`, 'GET')
    }
}