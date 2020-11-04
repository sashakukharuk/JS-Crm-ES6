import {HistoryData} from "./HistoryData";

export function HistoryLogic() {
    this._data = new HistoryData()

    this.showFilter = () => {
        return this._data.getFilter()
    }

    this.getOrders = async (filter, STEP) => {
        filter && this.dispatchFilter(filter)
        return await this._data.requestGetOrders(filter, STEP)
    }

    this.dispatchFilter = (filter) => {
        this._data.setFilter(filter)
    }
}