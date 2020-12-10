import {UtilRequest} from "../components/request/util";
import {AnalyticsPageInterface} from "../components/interface";

export class AnalyticsData {
    private _request: UtilRequest;
    constructor() {
        this._request = new UtilRequest()
    }
    async requestGetAnalytics(): Promise<AnalyticsPageInterface> {
        return await this._request.start('analytics/analytics', 'GET')
    }
}
