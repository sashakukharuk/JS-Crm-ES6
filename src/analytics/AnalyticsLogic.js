import {AnalyticsData} from "./AnalyticsData";

export class AnalyticsLogic extends AnalyticsData {
    constructor() {
        super()
        this._analytics = null
    }
    async getAnalytics() {
        if (!this._analytics) {
            this._analytics = await this.requestGetAnalytics()
            return this._analytics
        } else {
            return this._analytics
        }
    }
}