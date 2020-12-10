import {UtilRequest} from "../components/request/util";
import {FilterInterface} from "../components/interface";

export class HistoryData {
    private request: UtilRequest;
    constructor() {
        this.request = new UtilRequest()
    }

    async requestGetOrders(filter: FilterInterface) {
        const start = filter ? filter.start ? filter.start : '' : ''
        const end = filter ? filter.end ? filter.end : '' : ''
        const order = filter ? filter.order ? filter.order : '' : ''
        const offset = filter ? filter.offset ? filter.offset : '' : ''
        const limit = filter ? filter.limit ? filter.limit : '' : ''
        const url =`start=${start}&end=${end}&order=${order}&offset=${offset}&limit=${limit}`
        window.history.pushState({}, 'name', `history?${url}`)
        return this.request.start(`order?${url}`, 'GET')
    }
}
