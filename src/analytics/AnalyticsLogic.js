import {AnalyticsData} from "./AnalyticsData";

export function AnalyticsLogic() {
    this._data = new AnalyticsData()
    this._analytics = null

    this.getAnalytics = async () => {
        if (!this._analytics) {
            this._analytics = await this._data.getAnalytics()
            return this._analytics
        } else {
            return this._analytics
        }
    }
}