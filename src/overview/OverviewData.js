import {UtilRequest} from "../components/request/util";

export class OverviewData {
    constructor() {
        this._request = new UtilRequest()
    }

    async requestGetOverview() {
        return this._request.start('analytics/overview', 'GET')
    }
}