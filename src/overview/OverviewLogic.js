import {OverviewData} from "./OverviewData";

export function OverviewLogic() {
    this.overview = null
    this._data = new OverviewData()
    this.getOverview = async () => {
        if (!this.overview) {
            this.overview = await this._data.requestGetOverview()
            return this.overview
        } else {
            return this.overview
        }
    }
}