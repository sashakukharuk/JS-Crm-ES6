import {HistoryData} from "./HistoryData";

export class HistoryLogic extends HistoryData {
    constructor(filter) {
        super(filter.offset, filter.limit, filter.order, filter.start, filter.end)
        this.filter = filter
    }

    async getOrders() {
        return await this.requestGetOrders()
    }
}