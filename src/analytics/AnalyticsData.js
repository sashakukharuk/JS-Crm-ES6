import {UtilRequest} from "../components/request/util";

export function AnalyticsData() {
    this._request = new UtilRequest()

    this.getAnalytics = async () => {
        return await this._request.start('analytics/analytics', 'GET')
    }
}