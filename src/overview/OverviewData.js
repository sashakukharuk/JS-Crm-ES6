import {UtilRequest} from "../components/util";

export function OverviewData() {
    this._request = new UtilRequest()

    this.requestGetOverview = async () => {
        return this._request.start('analytics/overview', 'GET')
    }
}