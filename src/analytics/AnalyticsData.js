import {UtilRequest} from "../components/request/util";

export class AnalyticsData {
    constructor() {
        this._request = new UtilRequest()
    }


    async requestGetAnalytics() {
        return await this._request.start('analytics/analytics', 'GET')
    }
}