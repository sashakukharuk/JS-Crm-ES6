import {OverviewData} from "./OverviewData";

export class OverviewLogic extends OverviewData {
    constructor() {
        super()
        this.overview = null
        this._data = new OverviewData()
    }

    async getOverview() {
        if (!this.overview) {
            this.overview = await this._data.requestGetOverview()
            return this.overview
        } else {
            return this.overview
        }
    }
}