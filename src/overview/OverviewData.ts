import {UtilRequest} from "../components/request/util";
import {OverviewPageInterface} from "../components/interface";

export class OverviewData {
    private request: UtilRequest;
    constructor() {
        this.request = new UtilRequest()
    }
    async requestGetOverview(): Promise<OverviewPageInterface> {
        return this.request.start('analytics/overview', 'GET')
    }
}
